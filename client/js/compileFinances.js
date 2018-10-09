import { months as monthNames } from "./monthDayNames";

function Year(year) {
  this.year = year;
  this.total = 0;
  this.months = [];

  // build months
  for (let i = 0; i <= 11; i++) {
    this.months[i] = new Month(i, year);
  }
}

class Month {
  constructor(month, year) {
    this.month = month + 1;
    this.name = monthNames[month];
    this.total = 0;
    this.days = [];
    this.categories = {};

    const totalDays = new Date(year, this.month, 0).getDate();
    // build days
    for (let i = 1; i <= totalDays; i++) {
      this.days.push(new Day(i));
    }
  }

  addCategory({ category, amount }) {
    if (this.categories.hasOwnProperty(category)) {
      this.categories[category].amount += amount;
    } else {
      this.categories[category] = { amount, visible: true };
    }
  }

  listCategories() {
    return Object.keys(this.categories)
      .map(name => {
        return {
          name,
          amount: this.categories[name].amount,
          visible: this.categories[name].visible
        };
      })
      .sort((a, b) => {
        return b.amount - a.amount;
      });
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
      const year = date.getFullYear();
      return [newDate[0].trim(), year].join("/");
    }

    return data.date;
  }
}

class Finance {
  constructor() {
    this.excludedCategories = [];
    this.transactions = [];
  }

  includeCategory(category) {
    const idx = this.excludedCategories.indexOf(category);
    this.excludedCategories.splice(idx, 1);

    if (this.excludedCategories.indexOf(category) > -1) {
      this.includeCategory(category);
    }
  }

  rawSpending(data) {
    this.transactions = data.map(function(obj) {
      return new Transaction({
        category: obj.gsx$subcategory.$t || obj.gsx$category.$t,
        date: obj.gsx$date.$t,
        description: obj.gsx$payee.$t || obj.gsx$description.$t,
        amount: obj.gsx$amount.$t
      });
    });

    return;
  }

  buildSpending() {
    return this.transactions.reduce((spending, transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() - 1;
      const amount = transaction.amount;

      spending[year] = spending[year] || new Year(year);

      spending[year].total += amount;
      spending[year].months[month].total += amount;
      spending[year].months[month].addCategory(transaction);

      if (!this.excludedCategories.includes(transaction.category)) {
        spending[year].months[month].days[day].total += amount;
        spending[year].months[month].days[day].transactions.push(transaction);
      }

      return spending;
    }, {});
  }
}

export default Finance;
