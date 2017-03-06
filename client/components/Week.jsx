import React from 'react';

function chunkWeeks(dates) {
    let weeks = [];
    let weekCount = Math.ceil(dates.length / 7);
    for (var i = 0; i < weekCount; i++) {
        let weekIdx = i * 7;
        let days = dates.slice(weekIdx, weekIdx + 7);
        weeks.push(days);
    }
    return weeks;
}

export default function Week(props) {
    return (
        <div className="month--weeks">{chunkWeeks(props.dates).reduce((pMonth, cMonth, i) => {
            let weekHtml = cMonth.reduce((pDate, cDate, j) => {
                let week = cDate === null ? <li className="week--tile none"></li> : cDate;
                pDate.push(week);
                return pDate;
            }, [])

            pMonth.push(<ul className={"week week-" + (i + 1)}>{weekHtml}</ul>);
            return pMonth;
        }, [])}
        </div>
    )
}
