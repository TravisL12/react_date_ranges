import React from "react";
import Tile from "./Tile";
import Breadcrumbs from "./Breadcrumbs";
import currency from "../js/currencyFormat";
import { months as monthNames, days as dayNames } from "../js/monthDayNames";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  findTotalPercent(total) {
    if (!total) {
      return 0;
    }
    const maxTotal = 1000;
    return total >= maxTotal ? 10 : Math.ceil((total / maxTotal) * 10);
  }

  buildDates() {
    const { year, month, monthSpending, match } = this.props;
    const startDOW = new Date(year, month, 1).getDay();
    const dates = new Array(startDOW).fill(null); // pad start of month until first day of month

    for (let i = 1; i <= monthSpending.days.length; i++) {
      const spending = monthSpending.days[i - 1];
      dates.push(
        <Tile
          key={i}
          link={`${match.url}/${i}`}
          className={`percent-${this.findTotalPercent(spending.total)}`}
        >
          <div className="tile-date">{i}</div>
          <div className="tile-amount">
            {spending.total > 0 && currency(spending.total)}
          </div>
          <div>{spending.transactions.length}</div>
        </Tile>
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
