import React from "react";
import monthNames from "../js/monthNames.js";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { displayMonth: this.props.month + 1, year: this.props.year };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  change(event) {
    const { value, name } = event.target;
    const data = { [name]: value };

    this.setState(data);
  }

  submit() {
    this.props.submitDates(this.state.displayMonth - 1, this.state.year);
  }

  previousMonth() {
    const displayMonth =
      this.state.displayMonth - 1 < 1 ? 12 : this.state.displayMonth - 1;
    const year =
      this.state.displayMonth - 1 < 1 ? this.state.year - 1 : this.state.year;

    this.setState({ displayMonth, year }, this.submit);
  }

  nextMonth() {
    const displayMonth =
      this.state.displayMonth + 1 > 12 ? 1 : this.state.displayMonth + 1;
    const year =
      this.state.displayMonth + 1 > 12 ? this.state.year + 1 : this.state.year;

    this.setState({ displayMonth, year }, this.submit);
  }

  isFutureDate() {
    const today = new Date();
    const newDate = new Date(this.state.year, this.state.displayMonth, 1);

    return newDate.getTime() > today.getTime();
  }

  render() {
    const monthName = monthNames[this.props.month];
    const isNextDisabled = this.isFutureDate();

    return (
      <div className={`header ${monthName.toLowerCase()}`}>
        <div className="month--name">{`${monthName} ${this.props.year}`}</div>
        <div className="month-buttons">
          <button type="button" onClick={this.previousMonth}>
            Prev
          </button>
          <button
            type="button"
            onClick={this.nextMonth}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
        <div className="header--container-date-input">
          <div className="month">
            <label>Month:</label>
            <input
              type="text"
              name="month"
              value={this.state.displayMonth}
              onChange={this.change}
            />
          </div>

          <div className="year">
            <label>Year Date:</label>
            <input
              type="text"
              name="year"
              value={this.state.year}
              onChange={this.change}
            />
          </div>

          <button type="submit" id="submit-dates" onClick={this.submit}>
            Get Range
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
