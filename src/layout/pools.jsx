import React from "react";
import Panel from "../components/panel";

const Pools = ({ pools = {}, columns }) => (
  <div className="pools">
    {Object.keys(pools).map(poolKey => (
      <Panel
        key={"pool-" + poolKey}
        title={poolKey}
        rows={pools[poolKey]}
        columns={columns}
      />
    ))}
  </div>
);

export default Pools;
