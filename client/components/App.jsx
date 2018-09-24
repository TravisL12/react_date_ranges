import React from "react";
import Spending from "./Spending.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import finances from "../js/compileFinances.js";

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
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Spending spending={this.state.spending} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
