import React from 'react';

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

function buildDays (month) {
    return month.map((date, j) => {
        return date === null ? <li key={j} className='week--tile none'></li> : date;
    });
}

function buildWeeks (dates) {
    return chunkWeeks(dates).map((month, i) => {
        return <ul key={i} className={'week week-' + (i + 1)}>{buildDays(month)}</ul>;
    });
}

export default function Week (props) {
    return (
        <div className='month--weeks'>{buildWeeks(props.dates)}</div>
    )
}
