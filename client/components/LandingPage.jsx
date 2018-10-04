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

  return <div className="year-tiles">{years}</div>;
}

export default LandingPage;
