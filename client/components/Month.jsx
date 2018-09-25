import React from "react";
import Day from "./Day.jsx";
import monthNames from "../js/monthNames.js";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function chunkWeeks(dates) {
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
  const weekPad = new Array(dow).fill(null);

  return weekPad.concat(dates);
}

function buildDates(props) {
  const { month, year, monthSpendingData } = props;
  const daysOfYear = [];

  for (let i = 1; i <= monthSpendingData.day.length; i++) {
    const date = new Date(year, month, i);
    daysOfYear.push(renderDay(date, monthSpendingData));
  }

  return padWeeks(daysOfYear, props);
}

function Month(props) {
  const monthName = monthNames[props.month];
  const dates = buildDates(props);

  return (
    <div
      key={monthName + props.year}
      className={"month " + monthName.toLowerCase()}
    >
      <h1 className={monthName.toLowerCase()}>
        {monthName} {props.year}
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
      <div className="month--weeks">
        {chunkWeeks(dates).map((week, i) => {
          return (
            <ul key={i} className="week">
              {week.map((date, j) => {
                return date ? date : <li key={j} className="week--tile none" />;
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Month;
