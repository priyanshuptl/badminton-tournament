import React from "react";
import Panel from "../components/collapsible-panel";
import Table from "../components/table";

const Pools = ({ pools = {}, columns }) => (
  <div className="pools">
    {Object.keys(pools).map(poolKey => (
      <Panel key={"pool-" + poolKey} title={poolKey}>
        <Table data={pools[poolKey]} columns={columns} />
      </Panel>
    ))}
  </div>
);

export default Pools;
