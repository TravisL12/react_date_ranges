import React from "react";
import { Route, Link } from "react-router-dom";
import { months as monthNames } from "../js/monthDayNames";

function Breadcrumbs() {
  return (
    <h1 className="breadcrumbs">
      <Link to={"/"}>Cash Calendar</Link>

      <Route
        path="/:year"
        render={props => {
          return (
            <Link to={`/${props.match.params.year}`}>
              {" "}
              > {props.match.params.year}
            </Link>
          );
        }}
      />

      <Route
        path="/:year/:month"
        render={props => {
          return (
            <Link
              to={`/${props.match.params.year}/${props.match.params.month}`}
            >
              {" "}
              > {monthNames[props.match.params.month]}
            </Link>
          );
        }}
      />

      <Route
        path="/:year/:month/:day"
        render={props => {
          return <span> > {props.match.params.day}</span>;
        }}
      />
    </h1>
  );
}

export default Breadcrumbs;
