import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.jsx";
import ConfigureForm from "./components/layout/config.form";
import Home from "./components/layout/home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Badminton Tournament" />
        <Route exact path="/" component={ConfigureForm} />
        <Route path="/configure" component={ConfigureForm} />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default App;
