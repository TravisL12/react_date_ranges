import React from 'react';
import Month from './Month.jsx';
import Day from './Day.jsx';
import Header from './Header.jsx';

import axios from 'axios';
import finances from '../js/compileFinances.js';

require('../styles/application.scss');

function formatDate(date) {
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/')
}

export default class App extends React.Component {
    constructor (props) {
        super(props);

        let today = new Date();
        this.state = {
            start: formatDate(new Date('2016', '0', '1')),
            end: formatDate(today)
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let url = 'https://spreadsheets.google.com/feeds/list/1X05BAK1GSF4rbr-tSPWh2GBFk1zqg3jUPxrDcGivw9s/1/public/values?alt=json';
        axios.get(url).then(res => {
            this.setState({
                spending: finances.rawSpending(res)
            })
            this.handleSubmit();
        })
    }

    padWeeks(dates) {
        let dow = dates[0].props.dow;
        if (dow > 0) {
            let weekPad = new Array(dow).fill(null);

            dates = weekPad.concat(dates);
        }
        return dates;
    }

    renderMonth(dates) {
        let month = dates[0].props.month,
            year  = dates[0].props.year;

        dates = this.padWeeks(dates);

        return <Month key={month.toString() + year.toString()}
                    month = {month}
                    year  = {year}
                    dates = {dates}
                />
    }

    getDay(date) {
        let day   = date.getDate(),
            dow   = date.getDay(),
            month = date.getMonth(),
            year  = date.getFullYear();

        return <Day key={date.toString()}
                    day   = {day}
                    dow   = {dow}
                    month = {month}
                    year  = {year}
                    spending = {this.state.spending[year].month[month+1].day[day]}
                />
    }

    handleChange(data) {
        this.setState(data);
    }

    handleSubmit() {

        let start = new Date(this.state.start),
            end   = new Date(this.state.end),
            daysOfYear = {};

        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            let tile = this.getDay(date);

            if (!daysOfYear.hasOwnProperty(tile.props.year)) {
                daysOfYear[tile.props.year] = {};
            }

            if (!daysOfYear[tile.props.year].hasOwnProperty(tile.props.month)) {
                daysOfYear[tile.props.year][tile.props.month] = [];
            }

            daysOfYear[tile.props.year][tile.props.month].push(tile);
        }

        let calYears = Object.keys(daysOfYear).map((year) => {
            let output = [];
            for (let i in daysOfYear[year]) {
                output.push(this.renderMonth(daysOfYear[year][i]));
            }
            return output;
        });

        this.setState({
          calendar: calYears
        });
    }

    render () {
        return (
            <div>
                <Header start={this.state.start} end={this.state.end} change={this.handleChange} submit={this.handleSubmit}/>
                <div className='calendar'>{this.state.calendar}</div>
            </div>
        )
    }
};
