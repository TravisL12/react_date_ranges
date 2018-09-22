import React from "react";
import Month from "./Month.jsx";
import Day from "./Day.jsx";
import Header from "./Header.jsx";

import axios from "axios";
import finances from "../js/compileFinances.js";

require("../styles/application.scss");

export default class Spending extends React.Component {
  constructor(props) {
    super(props);

    let today = new Date();
    this.state = {
      month: today.getMonth(),
      year: today.getFullYear()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let url =
      "https://spreadsheets.google.com/feeds/list/1X05BAK1GSF4rbr-tSPWh2GBFk1zqg3jUPxrDcGivw9s/1/public/values?alt=json";
    axios.get(url).then(res => {
      this.setState({
        spending: finances.rawSpending(res)
      });
      this.handleSubmit(this.state.month, this.state.year);
    });
  }

  padWeeks(dates) {
    let dow = dates[0].props.dow;
    if (dow > 0) {
      let weekPad = new Array(dow).fill(null);

      dates = weekPad.concat(dates);
    }
    return dates;
  }

  renderMonth(dates) {
    let month = dates[0].props.month,
      year = dates[0].props.year;

    dates = this.padWeeks(dates);

    return (
      <Month
        key={month.toString() + year.toString()}
        month={month}
        year={year}
        dates={dates}
      />
    );
  }

  getDay(date, spending) {
    let day = date.getDate(),
      dayIdx = day - 1,
      dow = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear();

    return (
      <Day
        key={date.toString()}
        day={day}
        dow={dow}
        month={month}
        year={year}
        spending={spending.day[dayIdx]}
      />
    );
  }

  handleSubmit(month, year) {
    let daysOfYear = {},
      thisMonthSpending = this.state.spending[year].month[month],
      start = new Date(year, month, 1),
      end = new Date(year, month, thisMonthSpending.day.length);

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      let tile = this.getDay(date, thisMonthSpending);

      if (!daysOfYear.hasOwnProperty(tile.props.year)) {
        daysOfYear[tile.props.year] = {};
      }

      if (!daysOfYear[tile.props.year].hasOwnProperty(tile.props.month)) {
        daysOfYear[tile.props.year][tile.props.month] = [];
      }

      daysOfYear[tile.props.year][tile.props.month].push(tile);
    }

    let calYears = this.renderMonth(daysOfYear[year][month]);

    this.setState({
      month: month,
      year: year,
      calendar: calYears
    });
  }

  render() {
    return (
      <div>
        <Header
          month={this.state.month}
          year={this.state.year}
          submit={this.handleSubmit}
        />
        <div className="calendar">{this.state.calendar}</div>
      </div>
    );
  }
}
