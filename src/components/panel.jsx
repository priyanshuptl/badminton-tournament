import React, { useState } from "react";
import Row from "./row";

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
          <Row key={"collapsible-content-row-" + index} row={row} />
        ))}
      </div>
    </div>
  );
};

export default Panel;
