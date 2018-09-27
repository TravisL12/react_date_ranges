import React from "react";
import { Link } from "react-router-dom";

function LandingPage(props) {
  const years = Object.keys(props.spending).map((year, idx) => {
    return (
      <li key={idx}>
        <Link to={`/${year}`}>{year}</Link>
      </li>
    );
  });

  return (
    <div>
      <h1>Cash Calendar</h1>
      <ul>{years}</ul>
    </div>
  );
}

export default LandingPage;
