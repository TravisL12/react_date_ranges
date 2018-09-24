import React from "react";

function TransactionSquare(props) {
  return <li className="transaction-square" title={props.data.description} />;
}

function displayTotal(total) {
  let num = total > 0 ? "$" + Math.round(Math.round(total * 100) / 100) : "";
  return num.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}

function findTotalPercent(total) {
  if (!total) {
    return 0;
  }
  const maxTotal = 1000;
  return total >= maxTotal ? 10 : Math.ceil((total / maxTotal) * 10);
}

function Day(props) {
  const { day, daySpendingData } = props;

  return (
    <li
      key={props.day}
      className={
        "week--tile percent-" + findTotalPercent(daySpendingData.total)
      }
    >
      <div className="week--tile-day">{day}</div>
      <div className="week--tile-amount">
        {displayTotal(daySpendingData.total)}
      </div>
      <ul className="week--tile-transasction-square">
        {daySpendingData.transactions.map((transaction, i) => {
          return <TransactionSquare key={i} data={transaction} />;
        })}
      </ul>
    </li>
  );
}

export default Day;
