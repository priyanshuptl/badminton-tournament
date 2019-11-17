import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { UrlStrings, HeaderData, DefaultValues } from "./static";
import "./App.css";
import Header from "./components/header.jsx";
import ConfigureForm from "./components/layout/config.form";
import Home from "./components/layout/home";

class App extends Component {
  render() {
    const {
      history: {
        location: { pathname }
      },
      history
    } = this.props;
    if (!pathname || pathname === "/") {
      history.push({ pathname: DefaultValues.LANDING_PAGE_URL });
    }

    return (
      <div className="App">
        <Header data={HeaderData} />
        <Route path={UrlStrings.CONFIGURE} component={ConfigureForm} />
        <Route path={UrlStrings.HOME} component={Home} />
      </div>
    );
  }
}

export default withRouter(App);
