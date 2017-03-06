import React from 'react';

export default class DateTile extends React.Component {

    render () {
        return (
            <li key={this.props.day} className="week--tile">
                <div className="week--tile-day">{this.props.day}</div>
            </li>
        )
    }

}
