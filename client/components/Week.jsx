import React from 'react';

function chunkWeeks(dates) {
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

export default function Week (props) {
    return (
        <div className="month--weeks">{chunkWeeks(props.dates).reduce((pMonth, cMonth, i) => {
            let weekHtml = cMonth.reduce((pDate, cDate, j) => {
                let week = cDate === null ? <li key={j + i} className="week--tile none"></li> : cDate;
                pDate.push(week);
                return pDate;
            }, [])

            pMonth.push(<ul key={i.toString()} className={"week week-" + (i + 1)}>{weekHtml}</ul>);
            return pMonth;
        }, [])}
        </div>
    )
}
