import React from "react";
import Tile from "./Tile";
import Breadcrumbs from "./Breadcrumbs";

function Year(props) {
  const months = props.yearSpending.months.map((monthData, idx) => {
    return (
      <Tile key={idx} link={`/${props.year}/${monthData.month}`}>
        {monthData.name}
      </Tile>
    );
  });

  return (
    <div className="year-view">
      <Breadcrumbs {...props} />
      <div className="month-tiles">{months}</div>
    </div>
  );
}

export default Year;
