function Year () {
    this.total  = 0;
    this.month  = {};
    this.maxDay = 0;
    this.maxMonth = 0;

    // build months
    for (let i = 1; i <= 12; i++) {
        this.month[i] = new Month();
    }
}

function Month () {
    this.total = 0;
    this.day = {};

    // build days
    for (let i = 1; i <= 31; i++) {
        this.day[i] = new Day();
    }
}

function Day () {
    this.total = 0;
    this.transactions = [];
}

var Finances = {

    rawSpending (data) {
        let spending = data.data.feed.entry.map(function(obj) {
            return {
                category:    obj.gsx$subcategory.$t || obj.gsx$category.$t,
                date:        obj.gsx$date.$t,
                description: obj.gsx$payee.$t || obj.gsx$description.$t,
                amount:      obj.gsx$amount.$t
            };
        });
        return this.buildSpending(spending);
    },

    buildSpending (data) {
        let spending = {};
        let categories = {};
        for (var i in data) {
            let transaction = data[i];
            transaction.date = this.parseDate(transaction);
            transaction.amount = parseFloat(transaction.amount);
            transaction.description = this.parseDescription(transaction);

            if (categories[transaction.category] === undefined) {
                categories[transaction.category] = {
                    name: transaction.category,
                    value: true,
                    total: 0
                };
            }

            let date = new Date(transaction.date);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();

            spending[year] = spending[year] || new Year();
            
            spending[year].total += transaction.amount;
            spending[year].month[month].total += transaction.amount;
            spending[year].month[month].day[day].total += transaction.amount;

            spending[year].month[month].day[day].transactions.push(transaction);
        }

        return spending;
    },

    parseDescription (transaction) {
        var purchaseRE  = new RegExp(/(purchase\s*authorized\s*on\s*)/i);
        var rand16RE    = new RegExp(/\S{16} (card) \d{4,}/i);
        var leadDatesRE = new RegExp(/\d{2}\/\d{2}\s*/i);
        var randomNumRE = new RegExp(/[\S]*\d{3,}/gi);

        return transaction.description.replace(purchaseRE, '').replace(rand16RE,'').replace(leadDatesRE,'').replace(randomNumRE,'');
    },

    parseDate (transaction) {
        var re = new RegExp(/((^\d{1,2}|\s\d{1,2})\/\d{2}\s)/);
        var newDate = transaction.description.match(re);
        if (newDate) {
            var date  = new Date(transaction.date);
            var year  = date.getYear() - 100;
            return newDate[0] + '/' + year;
        }
        return transaction.date;
    }

}

export default Finances;
