import React from "react";
import { Route } from "react-router-dom";
import currency from "../js/currencyFormat";

function sumCategories(daysSpending) {
  const categories = {};

  daysSpending.forEach(day => {
    day.transactions.forEach(transaction => {
      if (categories[transaction.category]) {
        categories[transaction.category] += transaction.amount;
      } else {
        categories[transaction.category] = transaction.amount;
      }
    });
  });

  return Object.keys(categories).map(name => {
    return { name, amount: categories[name] };
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
            props.spending[year].months[month].days
          );
          return (
            <ul>
              {categories.map((category, idx) => {
                return (
                  <li key={idx}>
                    {category.name} - {currency(category.amount)}
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
