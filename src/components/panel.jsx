import React, { useState } from "react";

const Panel = ({ title, rows }) => {
  const [collapsed, setCollapsed] = useState(false);
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
        Rows Here!
      </div>
    </div>
  );
};

export default Panel;
