import React from "react";
import { Route } from "react-router-dom";
import currency from "../js/currencyFormat";

function SideBar(props) {
  return (
    <aside className="side-bar">
      <Route
        exact
        path="/:year/:month"
        render={routeProps => {
          const { month, year } = routeProps.match.params;
          const monthSpending = props.spending[year].months[month - 1];

          const updateCategories = event => {
            props.updateCategories(event, monthSpending);
          };

          return (
            <div>
              <h1>Total: {currency(monthSpending.total)}</h1>
              <ul className="side-bar--categories-list">
                {monthSpending.listCategories().map((category, idx) => {
                  return (
                    <li key={idx}>
                      <input
                        type="checkbox"
                        id={category.name}
                        defaultChecked={category.visible}
                        onChange={updateCategories}
                      />
                      <label htmlFor={category.name}>
                        <span className="category-name" title={category.name}>
                          {category.name}
                        </span>{" "}
                        <span className="category-amount">
                          {currency(category.visible ? category.amount : 0)}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }}
      />
    </aside>
  );
}

export default SideBar;
