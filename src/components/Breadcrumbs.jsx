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
          const { year } = props.match.params;
          return <Link to={`/${year}`}> > {year}</Link>;
        }}
      />

      <Route
        path="/:year/:month"
        render={props => {
          const { month, year } = props.match.params;
          return (
            <Link to={`/${year}/${month}`}> > {monthNames[month - 1]}</Link>
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
