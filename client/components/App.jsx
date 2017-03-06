import React from 'react';
import Month from './Month.jsx';
import Day from './Day.jsx';

function formatDate(date) {
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/')
}

export default class App extends React.Component {
    constructor (props) {
        super(props);

        let today = new Date();

        this.state = {
            start: '1/1/2016',
            end: formatDate(today)
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleChange(event) {
        const value = event.target.value;
        const name  = event.target.name;

        this.setState({
          [name]: value
        });
    }

    padWeeks (dates) {
        let dow = dates[0].props.dow;
        if (dow > 0) {
            let weekPad = new Array(dow).fill(null);

            dates = weekPad.concat(dates);
        }
        return dates;
    }

    renderMonth(dates) {
        let month = dates[0].props.month;
        let year  = dates[0].props.year;
        dates = this.padWeeks(dates);

        return <Month key={month.toString() + year.toString()}
                    month = {month}
                    year  = {year}
                    dates = {dates}
                />
    }

    handleSubmit() {

        let start = new Date(this.state.start),
            end   = new Date(this.state.end);

        let daysOfYear = {};
        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            let tile = <Day key={start.toString()}
                day   = {date.getDate()}
                dow   = {date.getDay()}
                month = {date.getMonth()}
                year  = {date.getFullYear()}
            />;

            if (!daysOfYear.hasOwnProperty(tile.props.year)) {
                daysOfYear[tile.props.year] = {};
            }

            if (!daysOfYear[tile.props.year].hasOwnProperty(tile.props.month)) {
                daysOfYear[tile.props.year][tile.props.month] = [];
            }

            daysOfYear[tile.props.year][tile.props.month].push(tile);
        }

        let calYears = Object.keys(daysOfYear).reduce((output, year) => {
            for (let i in daysOfYear[year]) {
                output.push(this.renderMonth(daysOfYear[year][i]));
            }
            return output;
        }, []);

        this.setState({
          calendar: calYears
        });
    }

    render () {
        return (
            <div>
                <div className='enter-dates'>
                    <h1>Enter a date range!</h1>
                        <input type='text' name='start' value={this.state.start} onChange={this.handleChange}></input>
                        <input type='text' name='end' value={this.state.end} onChange={this.handleChange}></input>
                        <button type='submit' id='submit-dates' onClick={this.handleSubmit}>Get Range</button>
                </div>
                <div className='calendar'>{this.state.calendar}</div>
            </div>
        )
    }
};
