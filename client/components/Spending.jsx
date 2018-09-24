import React from "react";
import Month from "./Month.jsx";
import Header from "./Header.jsx";

import axios from "axios";
import finances from "../js/compileFinances.js";

require("../styles/application.scss");

export default class Spending extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    this.state = {
      spending: undefined,
      month: today.getMonth(),
      year: today.getFullYear()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url =
      "https://spreadsheets.google.com/feeds/list/1X05BAK1GSF4rbr-tSPWh2GBFk1zqg3jUPxrDcGivw9s/1/public/values?alt=json";
    axios.get(url).then(res => {
      this.setState({ spending: finances.rawSpending(res) }, this.handleSubmit);
    });
  }

  handleSubmit(month = this.state.month, year = this.state.year) {
    this.setState({
      month,
      year
    });
  }

  render() {
    const { month, year } = this.state;
    const monthView = this.state.spending && (
      <Month
        key={`${month.toString()} ${year.toString()}`}
        month={month}
        year={year}
        monthSpendingData={this.state.spending[year].month[month]}
      />
    );

    return (
      <div>
        <Header {...this.state} submit={this.handleSubmit} />
        <div className="calendar">{monthView}</div>
      </div>
    );
  }
}
