import React from "react";
import Month from "./Month.jsx";
import Header from "./Header.jsx";

require("../styles/application.scss");

class Spending extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    this.state = {
      month: today.getMonth(),
      year: today.getFullYear()
    };

    this.submitDates = this.submitDates.bind(this);
  }

  submitDates(month = this.state.month, year = this.state.year) {
    this.setState({
      month,
      year
    });
  }

  render() {
    const { month, year } = this.state;
    const monthView = this.props.spending && (
      <Month
        key={`${month.toString()} ${year.toString()}`}
        month={month}
        year={year}
        monthSpendingData={this.props.spending[year].month[month]}
      />
    );

    return (
      <div>
        <Header {...this.state} submitDates={this.submitDates} />
        <div className="calendar">{monthView}</div>
      </div>
    );
  }
}

export default Spending;
