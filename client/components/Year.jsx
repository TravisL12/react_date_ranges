import React from "react";
import Tile from "./Tile";
import { Link } from "react-router-dom";

function Year(props) {
  const months = props.yearSpending.months.map((monthData, idx) => {
    return (
      <Link key={idx} to={`/${props.year}/${monthData.month}`}>
        <Tile>{monthData.name}</Tile>
      </Link>
    );
  });

  return (
    <div className="year-view">
      <h1>{props.year}</h1>
      <div className="month-tiles">{months}</div>
    </div>
  );
}

export default Year;
