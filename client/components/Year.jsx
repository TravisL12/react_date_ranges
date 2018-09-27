import React from "react";
import { Link } from "react-router-dom";

function Year(props) {
  const months = props.yearSpending.months.map((monthData, idx) => {
    return (
      <li key={idx}>
        <Link to={`/${props.year}/${monthData.month}`}>{monthData.name}</Link>
      </li>
    );
  });

  return (
    <div>
      <h1>{props.year}</h1>
      <ul>{months}</ul>
    </div>
  );
}

export default Year;
