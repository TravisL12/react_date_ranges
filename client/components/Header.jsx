import React from 'react';

require('../styles/header.scss');

export default class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            start: this.props.start,
            end:   this.props.end
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
        this.props.change(data);
    }

    submit () {
        this.props.submit();
    }

    render () {
        return (
            <div className='header'>
                <div className='header--container'>
                    <div className='header--container-date-input start'>
                        <label>Start Date:</label>
                        <input type='text' name='start' value={this.state.start} onChange={this.change}></input>
                    </div>
                    <div className='header--container-date-input end'>
                        <label>End Date:</label>
                        <input type='text' name='end' value={this.state.end} onChange={this.change}></input>
                    </div>
                    <button type='submit' id='submit-dates' onClick={this.submit}>Get Range</button>
                </div>
            </div>
        )
    }
}
