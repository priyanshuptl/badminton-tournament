import React from "react";
import { withRouter } from "react-router-dom";

const Header = ({ data: { title, tabs }, history }) => {
  const {
    location: { pathname }
  } = history;

  const pushHistory = pathname => {
    history.push({ pathname });
  };

  return (
    <header className="App-header">
      {title && (
        <h3 className="App-header-title" onClick={() => pushHistory("/")}>
          {title}
        </h3>
      )}
      {tabs && (
        <div className="header-tabs-container">
          {tabs.map(({ label, path, goToPath }) => (
            <span
              onClick={() => goToPath && pushHistory(goToPath)}
              className={`header-tab header-tab${
                pathname.includes(path) ? "-selected" : ""
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};

export default withRouter(Header);
