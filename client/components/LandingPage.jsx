import React from "react";
import Tile from "./Tile";
import currency from "../js/currencyFormat";

function LandingPage(props) {
  const years = Object.keys(props.spending).map((year, idx) => {
    return (
      <Tile key={idx} link={`/${year}`}>
        <div className="tile-date">{year}</div>
        <div className="tile-amount">
          {currency(props.spending[year].total)}
        </div>
      </Tile>
    );
  });

  return (
    <div className="total-view">
      <h1>Cash Calendar</h1>
      <div className="year-tiles">{years}</div>
    </div>
  );
}

export default LandingPage;
