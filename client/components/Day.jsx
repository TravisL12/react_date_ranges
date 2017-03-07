import React from 'react';

export default class Date extends React.Component {

    displayTotal () {
        let total = this.props.spending.total;
        return total > 0 ? '$' + Math.round(total * 100) / 100 : '';
    }

    render () {
        return (
            <li key={this.props.day} className="week--tile">
                <div className="week--tile-day">{this.props.day}</div>
                <div className="week--tile-amount">{this.displayTotal()}</div>
            </li>
        )
    }

}
