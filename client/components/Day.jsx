import React from "react";

function Day(props) {
  return (
    <div>
      <h1>
        {props.month}/{props.day}/{props.year}
      </h1>
    </div>
  );
}

export default Day;
