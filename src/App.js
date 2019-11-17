import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.jsx";
import ConfigureForm from "./components/layout/config.form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Badminton Tournament" />
        <Route exact path="/" component={ConfigureForm} />
        <Route path="/configure" component={ConfigureForm} />
      </div>
    );
  }
}

export default App;
