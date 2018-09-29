import React from "react";
import Breadcrumbs from "./Breadcrumbs";

function Day(props) {
  return (
    <div>
      <Breadcrumbs {...props} />
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.daySpending.transactions.map((trans, idx) => (
            <tr key={idx}>
              <td>{trans.category}</td>
              <td>{trans.date}</td>
              <td>${trans.amount}</td>
              <td>{trans.description}</td>
            </tr>
          ))}
          <tr key={"total"}>
            <td>Total</td>
            <td>${props.daySpending.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Day;
