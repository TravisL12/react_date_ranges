import React from "react";
import Tile from "./Tile";

function LandingPage(props) {
  const years = Object.keys(props.spending).map((year, idx) => {
    return (
      <Tile key={idx} link={`/${year}`}>
        {year}
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
