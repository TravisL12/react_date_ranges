import React from "react";
import { Link } from "react-router-dom";

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
  const yearLink = year ? <Link to={`/${year}`}>{year}</Link> : null;
  const monthLink = month ? (
    <Link to={`/${year}/${month + 1}`}>{monthNames[month]}</Link>
  ) : null;

  const crumbs = [yearLink, monthLink];

  return (
    <h1 className="breadcrumbs">
      <Link to={"/"}>Cash Calendar</Link>
      {crumbs.map((crumb, idx) => {
        return (
          <span key={idx}>
            {crumb ? " >" : null} {crumb}
          </span>
        );
      })}
      <span>
        {day ? " >" : null} {day}
      </span>
    </h1>
  );
}

export default Breadcrumbs;
