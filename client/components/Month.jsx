import React from "react";
import Day from "./Day.jsx";
import Week from "./Week.jsx";
import monthNames from "../js/monthNames.js";
import chunkWeeks from "../js/chunkWeeks.js";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function WeekHeader(props) {
  return <div className="month--header-day">{props.day}</div>;
}

function renderDay(date, spending) {
  const day = date.getDate();

  return (
    <Day
      key={date.toString()}
      day={day}
      daySpendingData={spending.day[day - 1]}
    />
  );
}

function padWeeks(dates, props) {
  const dow = new Date(props.year, props.month, 1).getDay();

  if (dow > 0) {
    const weekPad = new Array(dow).fill(null);

    dates = weekPad.concat(dates);
  }
  return dates;
}

function buildDates(props) {
  const { month, year, monthSpendingData } = props;
  const daysOfYear = [];
  const start = new Date(year, month, 1);
  const end = new Date(year, month, monthSpendingData.day.length);

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    daysOfYear.push(renderDay(date, monthSpendingData));
  }

  return padWeeks(daysOfYear, props);
}

export default function Month(props) {
  const monthName = monthNames[props.month];
  const dates = buildDates(props);

  return (
    <div
      key={monthName + props.year}
      className={"month " + monthName.toLowerCase()}
    >
      <div className="month--header">
        {dayNames.map(day => {
          return <WeekHeader key={day} day={day} />;
        })}
      </div>
      <div className="month--weeks">
        {chunkWeeks(dates).map((week, i) => {
          return <Week key={i} dates={week} idx={i} />;
        })}
      </div>
    </div>
  );
}
