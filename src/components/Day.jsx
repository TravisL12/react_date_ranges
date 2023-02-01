import React from "react";
import currency from "../js/currencyFormat";

function Day(props) {
  const sortAmount = props.spending.transactions.sort((a, b) => {
    return b.amount - a.amount;
  });

  return (
    <div>
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
          {sortAmount.map((trans, idx) => (
            <tr key={idx}>
              <td>{trans.category}</td>
              <td>{trans.date}</td>
              <td>{currency(trans.amount)}</td>
              <td>{trans.description}</td>
            </tr>
          ))}
          <tr key={"total"}>
            <td colSpan="2">Total</td>
            <td>{currency(props.spending.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Day;
