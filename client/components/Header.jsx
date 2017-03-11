import React from 'react';
import monthNames from '../js/monthNames.js';

export default class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            month: this.props.month + 1,
            year:  this.props.year
        }

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change (event) {
        const value = event.target.value;
        const name  = event.target.name;
        let data = {
          [name]: value
        };

        this.setState(data);
    }

    submit () {
        this.props.submit(this.state.month - 1, this.state.year);
    }

    render () {
        let monthName = monthNames[this.props.month];
        return (
            <div className={'header ' + monthName.toLowerCase()}>
                <div className='header--container'>

                    <div className='header--container-date-input'>
                        <div className='month'>
                            <label>Month:</label>
                            <input type='text' name='month' value={this.state.month} onChange={this.change}></input>
                        </div>

                        <div className='year'>
                            <label>Year Date:</label>
                            <input type='text' name='year' value={this.state.year} onChange={this.change}></input>
                        </div>

                        <button type='submit' id='submit-dates' onClick={this.submit}>Get Range</button>
                    </div>

                    <div className='month--name'>{monthName + ' ' + this.props.year}</div>

                </div>
            </div>
        )
    }
}
