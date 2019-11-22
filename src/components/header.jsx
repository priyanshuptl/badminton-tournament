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
        <h2 className="App-header-title" onClick={() => pushHistory("/")}>
          {title}
        </h2>
      )}
      {tabs && (
        <div className="header-tabs-container">
          {tabs.map(({ label, path, goToPath }) => (
            <span
              key={"header-" + label}
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
