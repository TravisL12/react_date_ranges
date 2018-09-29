import React from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function Breadcrumbs(props) {
  const { year, month, day } = props;

  return (
    <h1>
      Cash Calendar > {year} {month ? `> ${monthNames[month]}` : ""}{" "}
      {day ? `> ${day}` : ""}
    </h1>
  );
}

export default Breadcrumbs;
