import React from "react";
import DayTile from "./DayTile";
import Tile from "./Tile";
import Breadcrumbs from "./Breadcrumbs";
import { months as monthNames, days as dayNames } from "../js/monthDayNames";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  buildDates() {
    const { year, month, monthSpending, match } = this.props;
    const startDOW = new Date(year, month, 1).getDay();
    const dates = new Array(startDOW).fill(null); // pad start of month until first day of month

    for (let i = 1; i <= monthSpending.days.length; i++) {
      dates.push(
        <DayTile
          key={i}
          day={i}
          link={`${match.url}/${i}`}
          daySpending={monthSpending.days[i - 1]}
        />
      );
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
            return date ? date : <Tile key={`none-${i}`} />;
          })}
        </div>
      </div>
    );
  }
}

export default Month;
