import React from "react";
import DayTile from "./DayTile";
import Tile from "./Tile";
import Breadcrumbs from "./Breadcrumbs";

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
      <DayTile
        key={date.toString()}
        day={day}
        link={`/${this.props.year}/${displayMonth}/${day}`}
        daySpending={spending.day[day - 1]}
      />
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
      <div className={"month-view " + monthName.toLowerCase()}>
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
          {dates.map((date, i) => {
            return date ? date : <Tile key={i} className="none" />;
          })}
        </div>
      </div>
    );
  }
}

export default Month;
