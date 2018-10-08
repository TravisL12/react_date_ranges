import React from "react";
import { Route } from "react-router-dom";
import currency from "../js/currencyFormat";
import { months as monthNames } from "../js/monthDayNames";

function sumCategories(daysSpending) {
  const categories = {};

  daysSpending.forEach(day => {
    day.transactions.forEach(transaction => {
      if (categories.hasOwnProperty(transaction.category)) {
        categories[transaction.category] += transaction.amount;
      } else {
        categories[transaction.category] = transaction.amount;
      }
    });
  });

  return Object.keys(categories)
    .map(name => {
      return { name, amount: categories[name] };
    })
    .sort((a, b) => {
      return b.amount - a.amount;
    });
}

function SideBar(props) {
  return (
    <aside className="side-bar">
      <h1>side bar</h1>

      <Route
        exact
        path="/:year/:month"
        render={routeProps => {
          const { month, year } = routeProps.match.params;
          const categories = sumCategories(
            props.spending[year].months[month - 1].days
          );
          return (
            <ul className="side-bar--categories-list">
              {categories.map((category, idx) => {
                return (
                  <li key={idx}>
                    <span className="category-name" title={category.name}>
                      {category.name}
                    </span>{" "}
                    <span className="category-amount">
                      {currency(category.amount)}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }}
      />
    </aside>
  );
}

export default SideBar;
