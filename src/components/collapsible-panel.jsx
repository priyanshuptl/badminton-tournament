import React, { useState } from "react";

const CollapsiblePanel = ({ title, children, contentOverflow = "auto" }) => {
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
        style={{
          display: collapsed ? "none" : "block",
          overflow: contentOverflow
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;
