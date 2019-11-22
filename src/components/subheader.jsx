import React from "react";

const Subheader = ({ data: { title, tabs }, selectedTab, onSelectTab }) => {
  return (
    <header className="App-subheader">
      {title && <h3 className="App-subheader-title">{title}</h3>}
      {tabs && (
        <div className="subheader-tabs-container">
          {tabs.map(({ label, path }) => (
            <span
              key={"subheader-" + label}
              onClick={() => path && onSelectTab(path)}
              className={`subheader-tab subheader-tab${
                selectedTab === path ? "-selected" : ""
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

export default Subheader;
