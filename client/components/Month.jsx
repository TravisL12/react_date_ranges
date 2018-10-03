import React from "react";
import DayTile from "./DayTile";
import Tile from "./Tile";
import Breadcrumbs from "./Breadcrumbs";
import monthNames from "../js/monthNames";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDay(day) {
    const { month, year, monthSpending } = this.props;
    const displayMonth = month + 1;

    return (
      <DayTile
        key={day}
        day={day}
        link={`/${year}/${displayMonth}/${day}`}
        daySpending={monthSpending.days[day - 1]}
      />
    );
  }

  buildDates() {
    const { year, month, monthSpending } = this.props;
    const startDOW = new Date(year, month, 1).getDay();
    const dates = new Array(startDOW).fill(null); // pad start of month until first day of week

    for (let i = 1; i <= monthSpending.days.length; i++) {
      dates.push(this.renderDay(i));
    }

    return dates;
  }

  render() {
    return (
      <div
        className={"month-view " + monthNames[this.props.month].toLowerCase()}
      >
        <Breadcrumbs {...this.props} />

        <div className="month--header">
          {dayNames.map(day => {
            return (
              <div key={day} className="month--header-day">
                {day}
              </div>
            );
          })}
        </div>

        <div className="month--calender">
          {this.buildDates(this.props).map((date, i) => {
            return date ? date : <Tile key={`none-${i}`} className="none" />;
          })}
        </div>
      </div>
    );
  }
}

export default Month;
