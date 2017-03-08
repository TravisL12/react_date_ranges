import React from 'react';

function TransactionSquare (props) {
    return (
        <li className='transaction-square' title={props.description}></li>
    )
}

function displayCount (transactions) {
    let square = [];
    if (transactions.length) {
        for (let i = 0; i < transactions.length; i++) {
            square.push(<TransactionSquare key={i} data={transactions[i]}/>);
        }
    }

    return square;
}

function displayTotal (total) {
    let num = total > 0 ? '$' + Math.round(Math.round(total * 100) / 100) : '';
    return num.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function findTotalPercent (total) {
    if (!total) { return 0; }
    let maxTotal = 1000;
    return total >= maxTotal ? 10 : Math.ceil((total/maxTotal) * 10);
}

export default function Date (props) {
    return (
        <li key={props.day} className={'week--tile percent-' + findTotalPercent(props.spending.total)}>
            <div className='week--tile-day'>{props.day}</div>
            <div className='week--tile-amount'>{displayTotal(props.spending.total)}</div>
            <ul className='week--tile-transasction-square'>{displayCount(props.spending.transactions)}</ul>
        </li>
    )
}
