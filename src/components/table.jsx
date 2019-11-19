import ReactTable from "react-table";
import React from "react";
import "react-table/react-table.css";

const Table = ({ data, columns }) => (
  <ReactTable
    data={data}
    columns={columns}
    minRows={0}
    sortable={true}
    defaultSorted={["points"]}
  />
);

export default Table;
