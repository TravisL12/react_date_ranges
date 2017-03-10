import React from 'react';
import Week from './Week.jsx';

import chunkWeeks from '../js/chunkWeeks.js';
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function WeekHeader(props) {
    return (
        <div className='month--header-day'>{props.day}</div>
    )
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
