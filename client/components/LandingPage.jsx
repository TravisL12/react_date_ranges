import React from "react";
import Tile from "./Tile";
import { Link } from "react-router-dom";

function LandingPage(props) {
  const years = Object.keys(props.spending).map((year, idx) => {
    return (
      <Link key={idx} to={`/${year}`}>
        <Tile>{year}</Tile>
      </Link>
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
