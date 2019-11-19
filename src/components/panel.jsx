import React, { useState } from "react";

const Panel = ({ title, rows = [] }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <button
        className={"collapsible " + (collapsed ? "" : "active")}
        onClick={() => setCollapsed(!collapsed)}
      >
        <p> {title}</p>
        <p>{collapsed ? "+" : "-"}</p>
      </button>
      <div
        className="content"
        style={{ display: collapsed ? "none" : "block" }}
      >
        {rows.map((row, index) => (
          <div
            key={"collapsible-content-row-" + index}
            className="collapsible-content-row"
          >
            {Object.values(row).map(rowValue => (
              <p
                key={"collapsible-content-row-cell-" + rowValue}
                className="collapsible-content-row-cell"
              >
                {rowValue}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
