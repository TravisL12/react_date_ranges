import React from 'react';
import Week from './Week.jsx';
import WeekHeader from './WeekHeader.jsx';

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

export default function Month (props) {
    let monthName = monthNames[props.month];

    return (
        <div key={monthName + props.year} className={"month " + monthName.toLowerCase()}>
            <div className="month--name">{monthName + ' ' + props.year}</div>
            <WeekHeader/>
            <Week dates={props.dates}/>
        </div>
    )
}
