import React from "react";
import Tile from "./Tile";
import currency from "../js/currencyFormat";
import Breadcrumbs from "./Breadcrumbs";
import Month from "./Month";
import { Route } from "react-router-dom";

function Year(props) {
  const months = props.spending.months.map((monthData, idx) => {
    return (
      <Tile
        key={idx}
        link={`${props.match.url}/${monthData.month}`}
        className={monthData.name.toLowerCase()}
      >
        <div className="tile-date">{monthData.name}</div>
        <div className="tile-amount">{currency(monthData.total)}</div>
      </Tile>
    );
  });

  return (
    <div className="year-view">
      <Breadcrumbs {...props} />
      <div className="month-tiles">{months}</div>
      <Route
        path={`${props.match.path}/:month`}
        render={routeProps => {
          const { month, year } = routeProps.match.params;
          const monthZeroIdx = +month - 1;

          return (
            <Month
              {...props}
              year={year}
              month={monthZeroIdx}
              monthSpending={props.spending.months[monthZeroIdx]}
            />
          );
        }}
      />
    </div>
  );
}

export default Year;
