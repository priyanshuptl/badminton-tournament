import React from "react";

const Row = ({ row = {} }) => (
  <div className="collapsible-content-row">
    {Object.values(row).map(rowValue => (
      <p
        key={"collapsible-content-row-cell-" + rowValue}
        className="collapsible-content-row-cell"
      >
        {rowValue}
      </p>
    ))}
  </div>
);

export default Row;
