import React from "react";
import Year from "./Year";

function LandingPage(props) {
  return (
    <div className="year-tiles">
      {Object.keys(props.spending).map((year, idx) => {
        return (
          <div key={idx}>
            <h2>{year}</h2>
            <Year yearSpending={props.spending[year]} year={year} />
          </div>
        );
      })}
    </div>
  );
}

export default LandingPage;
