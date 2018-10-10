import React from "react";
import { Route } from "react-router-dom";
import currency from "../js/currencyFormat";

function listCategories(categories) {
  return Object.keys(categories)
    .map(name => {
      const object = {
        name,
        amount: categories[name].amount,
        visible: categories[name].visible,
        isSubcategory: categories[name].isSubcategory
      };

      if (categories[name].subcategories) {
        object.subcategories = categories[name].subcategories;
      }

      return object;
    })
    .sort((a, b) => {
      return b.amount - a.amount;
    });
}

function SideBar(props) {
  const categoryListItem = (category, idx, updateCategories) => {
    let hasSubcategories;

    if (category.subcategories) {
      hasSubcategories = (
        <ul className="sub-categories-list">
          {listCategories(category.subcategories).map((subcategory, idx) => {
            return categoryListItem(subcategory, idx, updateCategories);
          })}
        </ul>
      );
    }

    return (
      <li
        className={category.isSubcategory ? "subcategory" : "category"}
        key={idx}
      >
        <input
          type="checkbox"
          id={category.name}
          checked={category.visible}
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
        {hasSubcategories}
      </li>
    );
  };

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

          const allOn = () => {
            props.toggleAllCategories(true);
          };

          const allOff = () => {
            props.toggleAllCategories();
          };

          return (
            <div>
              <h1>Total: {currency(monthSpending.total)}</h1>
              <div className="category-control-buttons">
                <button onClick={allOn}>On</button>
                <button onClick={allOff}>Off</button>
              </div>
              <ul className="side-bar--categories-list">
                {listCategories(monthSpending.categories).map(
                  (category, idx) => {
                    return categoryListItem(category, idx, updateCategories);
                  }
                )}
              </ul>
            </div>
          );
        }}
      />
    </aside>
  );
}

export default SideBar;
