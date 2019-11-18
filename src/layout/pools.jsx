import React from "react";
import Panel from "../components/panel";

const Pools = ({ pools = {} }) =>
  Object.keys(pools).map(poolKey => (
    <Panel key={"pool-" + poolKey} title={poolKey} rows={pools[poolKey]} />
  ));

export default Pools;