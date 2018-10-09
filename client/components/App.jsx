import React from "react";
import LandingPage from "./LandingPage";
import Day from "./Day";
import Month from "./Month";
import Year from "./Year";
import Breadcrumbs from "./Breadcrumbs";
import SideBar from "./SideBar";

import { Route } from "react-router-dom";
import axios from "axios";
import Finance from "../js/compileFinances.js";

require("../styles/application.scss");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.finances = new Finance();
    this.state = {
      spending: undefined
    };
  }

  componentDidMount() {
    const url =
      "https://spreadsheets.google.com/feeds/list/1X05BAK1GSF4rbr-tSPWh2GBFk1zqg3jUPxrDcGivw9s/1/public/values?alt=json";
    axios.get(url).then(({ data: { feed: { entry } } }) => {
      this.finances.rawSpending(entry);
      this.setState({ spending: this.finances.buildSpending() });
    });
  }

  toggleCategories(resetAll) {
    if (resetAll) {
      this.finances.excludedCategories = [];
    } else {
      this.finances.excludeAll = true;
    }

    this.setState(
      { spending: this.finances.buildSpending() },
      (this.finances.excludeAll = false)
    );
  }

  updateCategories(event) {
    const category = event.target.id;
    if (!this.finances.excludedCategories.includes(category)) {
      this.finances.excludedCategories.push(category);
    } else {
      this.finances.includeCategory(category);
    }

    this.setState({ spending: this.finances.buildSpending() });
  }

  render() {
    if (!this.state.spending) {
      return (
        <div className="loading">
          <h1>Loading ...</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <SideBar
          spending={this.state.spending}
          toggleCategories={this.toggleCategories.bind(this)}
          updateCategories={this.updateCategories.bind(this)}
        />

        <main className="spending-view">
          <Breadcrumbs />

          <Route
            exact
            path="/"
            render={props => {
              return <LandingPage {...props} spending={this.state.spending} />;
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
                  spending={this.state.spending[year]}
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
                  year={year}
                  month={monthZeroIdx}
                  spending={this.state.spending[year].months[monthZeroIdx]}
                />
              );
            }}
          />

          <Route
            exact
            path="/:year/:month/:day"
            render={props => {
              const { day, month, year } = props.match.params;
              const monthZeroIdx = +month - 1;

              return (
                <Day
                  {...props}
                  year={year}
                  month={monthZeroIdx}
                  day={day}
                  spending={
                    this.state.spending[year].months[monthZeroIdx].days[
                      +day - 1
                    ]
                  }
                />
              );
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
