import React from "react";
import Tile from "./Tile";
import Breadcrumbs from "./Breadcrumbs";
import currency from "../js/currencyFormat";
import { months as monthNames, days as dayNames } from "../js/monthDayNames";

class Month extends React.Component {
  constructor(props) {
    super(props);
  }

  findTotalPercent(total = 0) {
    const maxAmount = 1000;
    return total >= maxAmount ? 10 : Math.ceil((total / maxAmount) * 10);
  }

  buildDates() {
    const { year, month, monthSpending, match } = this.props;
    const startDOW = new Date(year, month, 1).getDay();
    const dates = new Array(startDOW).fill(null); // pad start of month until first day of month

    for (let day = 1; day <= monthSpending.days.length; day++) {
      const { total, transactions } = monthSpending.days[day - 1];
      const percentClass = this.findTotalPercent(total);

      dates.push(
        <Tile
          key={day}
          link={`${match.url}/${day}`}
          className={`percent-${percentClass}`}
        >
          <div className="tile-date">{day}</div>
          <div className="tile-amount">{total > 0 && currency(total)}</div>
          <div>{transactions.length}</div>
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

        <div>
          {dayNames.map(day => {
            return (
              <div key={day} className="day-of-week">
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
