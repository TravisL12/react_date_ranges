import React from 'react';
import Week from './Week.jsx';
import WeekHeader from './WeekHeader.jsx';

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

export default class Month extends React.Component {
    render () {
        let monthName = monthNames[this.props.month];

        return (
            <div key={monthName + this.props.year} className={"month " + monthName.toLowerCase()}>
                <div className="month--name">{monthName + ' ' + this.props.year}</div>
                <WeekHeader/>
                <Week dates={this.props.dates}/>
            </div>
        )
    }
}
