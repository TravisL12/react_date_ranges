import React from "react";
import LandingPage from "./LandingPage";
import Month from "./Month";
import Year from "./Year";

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
    if (!this.state.spending) {
      return <h1>Loading ...</h1>;
    }

    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => {
              return <LandingPage spending={this.state.spending} />;
            }}
          />

          <Route
            exact
            path="/:year"
            render={props => {
              const { year } = props.match.params;

              return (
                <Year
                  {...props}
                  year={year}
                  yearSpending={this.state.spending[year]}
                />
              );
            }}
          />

          <Route
            exact
            path="/:year/:month"
            render={props => {
              const { month, year } = props.match.params;
              const monthZeroIdx = +month - 1;

              return (
                <Month
                  {...props}
                  month={monthZeroIdx}
                  year={year}
                  monthSpending={this.state.spending[year].months[monthZeroIdx]}
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
