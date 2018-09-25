import React from "react";
import Month from "./Month.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import finances from "../js/compileFinances.js";

require("../styles/application.scss");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spending: undefined
    };
  }

  componentDidMount() {
    const url =
      "https://spreadsheets.google.com/feeds/list/1X05BAK1GSF4rbr-tSPWh2GBFk1zqg3jUPxrDcGivw9s/1/public/values?alt=json";
    axios.get(url).then(res => {
      this.setState({ spending: finances.rawSpending(res) });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <h1>Cash Calendar</h1>} />

          <Route
            exact
            path="/:year"
            render={props => {
              return <h1>Year {props.match.params.year}</h1>;
            }}
          />

          <Route
            exact
            path="/:year/:month"
            render={props => {
              const { month, year } = props.match.params;

              if (!this.state.spending) {
                return <h1>Loading ...</h1>;
              }

              return (
                <Month
                  {...props}
                  month={+month - 1}
                  year={year}
                  monthSpendingData={this.state.spending[year].month[month]}
                />
              );
            }}
          />

          <Route
            exact
            path="/:year/:month/:day"
            render={props => {
              const { day, month, year } = props.match.params;
              return (
                <h1>
                  {month}/{day}/{year}
                </h1>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
