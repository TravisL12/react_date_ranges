import monthNames from "../js/monthNames.js";

function Year() {
  this.total = 0;
  this.month = {};
  this.maxDay = 0;
  this.maxMonth = 0;

  // build months
  for (let i = 0; i <= 11; i++) {
    this.month[i] = new Month(i);
  }
}

function Month(month) {
  this.month = month + 1;
  this.name = monthNames[month];
  this.total = 0;
  this.day = [];

  // build days
  for (let i = 1; i <= 31; i++) {
    this.day.push(new Day(i));
  }
}

function Day(day) {
  this.day = day;
  this.total = 0;
  this.transactions = [];
}

class Transaction {
  constructor(data) {
    this.data = data;
    this.category = data.category;
    this.date = this.parseDate();
    this.amount = parseFloat(data.amount);
    this.description = this.parseDescription();
  }

  parseDescription() {
    const purchaseRE = new RegExp(/(purchase\s*authorized\s*on\s*)/i);
    const rand16RE = new RegExp(/\S{16} (card) \d{4,}/i);
    const leadDatesRE = new RegExp(/\d{2}\/\d{2}\s*/i);
    const randomNumRE = new RegExp(/[\S]*\d{3,}/gi);

    return this.data.description
      .replace(purchaseRE, "")
      .replace(rand16RE, "")
      .replace(leadDatesRE, "")
      .replace(randomNumRE, "");
  }

  parseDate() {
    const re = new RegExp(/((^\d{1,2}|\s\d{1,2})\/\d{2}\s)/);
    const newDate = this.data.description.match(re);

    if (newDate) {
      const date = new Date(this.data.date);
      const year = date.getYear() - 100;
      return newDate[0] + "/" + year;
    }

    return this.data.date;
  }
}

const Finances = {
  rawSpending(data) {
    let spending = data.data.feed.entry.map(function(obj) {
      return {
        category: obj.gsx$subcategory.$t || obj.gsx$category.$t,
        date: obj.gsx$date.$t,
        description: obj.gsx$payee.$t || obj.gsx$description.$t,
        amount: obj.gsx$amount.$t
      };
    });
    return this.buildSpending(spending);
  },

  buildSpending(data) {
    const spending = {};
    const categories = {};
    for (const i in data) {
      const transaction = new Transaction(data[i]);

      if (categories[transaction.category] === undefined) {
        categories[transaction.category] = {
          name: transaction.category,
          value: true,
          total: 0
        };
      }

      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() - 1;

      spending[year] = spending[year] || new Year();

      spending[year].total += transaction.amount;
      spending[year].month[month].total += transaction.amount;
      spending[year].month[month].day[day].total += transaction.amount;

      spending[year].month[month].day[day].transactions.push(transaction);
    }

    return spending;
  }
};

export default Finances;
