import React from 'react';

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

function WeekHeader() {
    return (
        <div className="month--header">
            {dayNames.map((day, idx) => {
                return (
                    <div key={idx} className="month--header-day">{day}</div>
                );
            })}
        </div>
    )
}

function Week(props) {
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
