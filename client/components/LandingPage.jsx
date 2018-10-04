import React from "react";
import Year from "./Year";

function LandingPage(props) {
  const years = Object.keys(props.spending).map((year, idx) => {
    return (
      <div key={idx}>
        <h2>{year}</h2>
        <Year yearSpending={props.spending[year]} year={year} />
      </div>
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
