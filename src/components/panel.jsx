import React, { useState } from "react";
import Table from "./table";

const Panel = ({ title, rows = [], columns = [] }) => {
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
        <Table data={rows} columns={columns} />
      </div>
    </div>
  );
};

export default Panel;
