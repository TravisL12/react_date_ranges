import React from "react";
import Tile from "./Tile";
import currency from "../js/currencyFormat";

function TransactionSquare(props) {
  return (
    <li className="transaction-square" title={props.data.description}>
      <span className="transaction-square--description">
        {props.data.description} ${props.data.amount}
      </span>
    </li>
  );
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
      className={`percent-${findTotalPercent(daySpending.total)}`}
    >
      <div className="tile-date">{day}</div>
      <div className="tile-amount">
        {daySpending.total > 0 && currency(daySpending.total)}
      </div>
      <ul className="day--tile-transasction-square">
        {daySpending.transactions.map((transaction, i) => {
          return <TransactionSquare key={i} data={transaction} />;
        })}
      </ul>
    </Tile>
  );
}

export default DayTile;
