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

export default class Month extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            monthName: monthNames[this.props.month]
        };
    }

    renderHeader () {
        return (
            dayNames.map((day) => {
                return (
                    <div key={day.toString()} className="month--header-day">{day}</div>
                );
            })
        )
    }

    renderWeeks () {
        return chunkWeeks(this.props.dates).reduce((pMonth, cMonth, i) => {
            let weekHtml = cMonth.reduce((pDate, cDate) => {
                let week = cDate === null ? <li className="week--tile none"></li> : cDate;
                pDate.push(week);
                return pDate;
            }, [])

            pMonth.push(<ul className={"week week-" + (i + 1)}>{weekHtml}</ul>);
            return pMonth;
        }, []);
    }

    render () {
        return (
            <div key={this.state.monthName + this.props.year} className={"month " + this.state.monthName.toLowerCase()}>
                <div className="month--name">{this.state.monthName + ' ' + this.props.year}</div>
                <div className="month--header">{this.renderHeader()}</div>
                <div className="month--weeks">{this.renderWeeks()}</div>
            </div>
        )
    }
}
