import React from "react";
import Tile from "./Tile";
import currency from "../js/currencyFormat";

function Year(props) {
  const months = props.spending.months.map((monthData, idx) => {
    return (
      <Tile
        key={idx}
        link={`/${props.year}/${monthData.month}`}
        className={monthData.name.toLowerCase()}
      >
        <div className="tile-date">{monthData.name}</div>
        <div className="tile-amount">{currency(monthData.total)}</div>
      </Tile>
    );
  });

  return (
    <div className="year-view">
      <div className="month-tiles">{months}</div>
    </div>
  );
}

export default Year;
