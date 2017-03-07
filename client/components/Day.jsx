import React from 'react';

function TransactionSquare (props) {
    return (
        <li className='transaction-square' title={props.description}></li>
    )
}

export default class Date extends React.Component {

    displayCount () {
        let transactions = this.props.spending.transactions;
        let square = [];
        if (transactions.length) {
            for (let i = 0; i < transactions.length; i++) {
                square.push(<TransactionSquare key={i} data={transactions[i]}/>);
            }
        }

        return square;
    }

    displayTotal () {
        let total = this.props.spending.total;
        return total > 0 ? '$' + Math.round(Math.round(total * 100) / 100) : '';
    }

    render () {
        return (
            <li key={this.props.day} className='week--tile'>
                <div className='week--tile-day'>{this.props.day}</div>
                <div className='week--tile-amount'>{this.displayTotal()}</div>
                <ul className='week--tile-transasction-square'>{this.displayCount()}</ul>
            </li>
        )
    }

}
