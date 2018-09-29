import React from "react";
import Tile from "./Tile";

function TransactionSquare(props) {
  return (
    <li className="transaction-square" title={props.data.description}>
      <span className="transaction-square--description">
        {props.data.description} ${props.data.amount}
      </span>
    </li>
  );
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

function DayTile(props) {
  const { day, daySpending } = props;

  return (
    <Tile
      key={props.day}
      link={props.link}
      className={`day--tile percent-${findTotalPercent(daySpending.total)}`}
    >
      <div className="day--tile-day">{day}</div>
      <div className="day--tile-amount">{displayTotal(daySpending.total)}</div>
      <ul className="day--tile-transasction-square">
        {daySpending.transactions.map((transaction, i) => {
          return <TransactionSquare key={i} data={transaction} />;
        })}
      </ul>
    </Tile>
  );
}

export default DayTile;
