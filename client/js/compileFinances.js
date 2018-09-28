const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function Year() {
  this.total = 0;
  this.months = [];
  this.maxDay = 0;
  this.maxMonth = 0;

  // build months
  for (let i = 0; i <= 11; i++) {
    this.months[i] = new Month(i);
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
    this.category = data.category;
    this.date = this.parseDate(data);
    this.amount = parseFloat(data.amount);
    this.description = this.parseDescription(data);
  }

  parseDescription(data) {
    const purchaseRE = new RegExp(/(purchase\s*authorized\s*on\s*)/i);
    const rand16RE = new RegExp(/\S{16} (card) \d{4,}/i);
    const leadDatesRE = new RegExp(/\d{2}\/\d{2}\s*/i);
    const randomNumRE = new RegExp(/[\S]*\d{3,}/gi);

    return data.description
      .replace(purchaseRE, "")
      .replace(rand16RE, "")
      .replace(leadDatesRE, "")
      .replace(randomNumRE, "");
  }

  parseDate(data) {
    const re = new RegExp(/((^\d{1,2}|\s\d{1,2})\/\d{2}\s)/);
    const newDate = data.description.match(re);

    if (newDate) {
      const date = new Date(data.date);
      const year = date.getYear() - 100;
      return newDate[0] + "/" + year;
    }

    return data.date;
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
      const amount = transaction.amount;

      spending[year] = spending[year] || new Year();

      spending[year].total += amount;
      spending[year].months[month].total += amount;
      spending[year].months[month].day[day].total += amount;

      spending[year].months[month].day[day].transactions.push(transaction);
    }

    return spending;
  }
};

export default Finances;
