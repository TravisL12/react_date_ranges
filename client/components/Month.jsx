import React from "react";
import DayTile from "./DayTile";
import Tile from "./Tile";
import { Link } from "react-router-dom";

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

  chunkWeeks(dates) {
    const weeks = [];
    const daysInWeek = 7;
    const weekCount = Math.ceil(dates.length / daysInWeek);

    for (var i = 0; i < weekCount; i++) {
      let weekIdx = i * daysInWeek;
      let days = dates.slice(weekIdx, weekIdx + daysInWeek);
      weeks.push(days);
    }
    return weeks;
  }

  renderDay(date, spending) {
    const day = date.getDate();
    const displayMonth = this.props.month + 1;

    return (
      <Link
        key={date.toString()}
        to={`/${this.props.year}/${displayMonth}/${day}`}
      >
        <DayTile day={day} daySpending={spending.day[day - 1]} />
      </Link>
    );
  }

  padWeeks(dates) {
    const dow = new Date(this.props.year, this.props.month, 1).getDay();
    const weekPad = new Array(dow).fill(null);

    return weekPad.concat(dates);
  }

  buildDates() {
    const { month, year, monthSpending } = this.props;
    const daysOfYear = [];

    for (let i = 1; i <= monthSpending.day.length; i++) {
      const date = new Date(year, month, i);
      daysOfYear.push(this.renderDay(date, monthSpending));
    }

    return this.padWeeks(daysOfYear);
  }

  render() {
    const monthName = this.props.monthSpending.name;
    const dates = this.buildDates(this.props);

    return (
      <div
        key={monthName + this.props.year}
        className={"month-view " + monthName.toLowerCase()}
      >
        <h1 className={monthName.toLowerCase()}>
          {monthName} {this.props.year}
        </h1>
        <div className="month--header">
          {dayNames.map(day => {
            return (
              <div key={day} className="month--header-day">
                {day}
              </div>
            );
          })}
        </div>
        <div className="month-calender">
          {this.chunkWeeks(dates).map((week, i) => {
            return (
              <div key={i} className="week">
                {week.map((date, j) => {
                  return date ? date : <Tile key={j} className="none" />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Month;
