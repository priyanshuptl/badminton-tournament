import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Input from "../input";
import { DefaultValues } from "../../defaults";

const ConfigureForm = ({ history }) => {
  const [participantsCount, setParticipantsCount] = useState(
    DefaultValues.PARTICIPANTS_COUNT
  );
  const [poolsCount, setPoolsCount] = useState(DefaultValues.POOL_COUNT);
  const [qualifiersCountPerPool, setQalifiersCountPerPool] = useState(
    DefaultValues.QUALIFIERS_COUNT_PER_POOL
  );

  const onSubmit = () => {
    const {
      location: { search: searchString }
    } = history;

    const newSearch = {
      ...queryString.parse(searchString),
      participantsCount,
      poolsCount,
      qualifiersCountPerPool
    };

    history.push({
      pathname: "/home",
      search: queryString.stringify(newSearch)
    });
  };

  return (
    <form onSubmit={onSubmit} key="ConfigureForm">
      <Input
        key="Number-of-participants"
        type="number"
        label="Number of participants"
        value={participantsCount}
        placeholder="Enter number of participants"
        isRequired={true}
        onChange={e => setParticipantsCount(e.target.value)}
      />
      <Input
        key="Number-of-pool"
        type="number"
        label="Number of pool"
        value={poolsCount}
        placeholder="Enter number of pools"
        isRequired={true}
        onChange={e => setPoolsCount(e.target.value)}
      />
      <Input
        key="Number-of-qualifiers-from-each-pool"
        type="number"
        label="Number of qualifiers from each pool"
        value={qualifiersCountPerPool}
        placeholder="Enter number of qualifiers from each pool"
        isRequired={true}
        onChange={e => setQalifiersCountPerPool(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default withRouter(ConfigureForm);
