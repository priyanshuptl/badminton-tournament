import React from "react";
import { withRouter } from "react-router-dom";

const Header = ({ title, history }) => {
  const {
    location: { pathname }
  } = history;

  const pushHistory = pathname => {
    history.push({ pathname });
  };

  return (
    <header className="App-header">
      <h3 onClick={() => pushHistory("/")}>{title}</h3>
      <div className="header-tabs-container">
        <span
          className={`header-tab header-tab${
            pathname.includes("home") ? "-selected" : ""
          }`}
        >
          Home
        </span>
        <span
          onClick={() => pushHistory("/configure")}
          className={`header-tab header-tab${
            pathname.includes("configure") || pathname === "/"
              ? "-selected"
              : ""
          }`}
        >
          Configure
        </span>
      </div>
    </header>
  );
};

export default withRouter(Header);
