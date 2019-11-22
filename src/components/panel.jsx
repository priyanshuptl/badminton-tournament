import React, { useState } from "react";

const Panel = ({ title, children }) => {
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
        {children}
      </div>
    </div>
  );
};

export default Panel;
