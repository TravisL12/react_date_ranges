import React from 'react';
import Week from './Week.jsx';
import WeekHeader from './WeekHeader.jsx';

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function chunkWeeks (dates) {
    let weeks = [],
        daysInWeek = 7,
        weekCount = Math.ceil(dates.length / daysInWeek);

    for (var i = 0; i < weekCount; i++) {
        let weekIdx = i * daysInWeek;
        let days = dates.slice(weekIdx, weekIdx + daysInWeek);
        weeks.push(days);
    }
    return weeks;
}

export default function Month (props) {
    let monthName = monthNames[props.month];

    return (
        <div key={monthName + props.year} className={'month ' + monthName.toLowerCase()}>
            <div className='month--name'>{monthName + ' ' + props.year}</div>
            <div className='month--header'>{dayNames.map((day) => { return <WeekHeader key={day} day={day}/> })}</div>
            <div className='month--weeks'>{
                chunkWeeks(props.dates).map((dates, i) => {
                    return <Week key={i} dates={dates} idx={i}/>
                })
            }</div>
        </div>
    )
}
