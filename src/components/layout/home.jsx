import React from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { SubheaderData, DefaultValues } from "../../static";
import Subheader from "../subheader";

const Home = ({ history }) => {
  const {
    location: { pathname, search: searchString }
  } = history;

  const {
    participantsCount = DefaultValues.PARTICIPANTS_COUNT,
    poolsCount = DefaultValues.POOL_COUNT,
    qualifiersCountPerPool = DefaultValues.QUALIFIERS_COUNT_PER_POOL,
    tab = DefaultValues.TAB
  } = queryString.parse(searchString);

  const getPlayers = () => {
    const players = [];
    for (let i = 0; i < participantsCount; i++) {
      players.push({
        name: "Player " + (i + 1),
        pool: parseInt(i % poolsCount) + 1
      });
    }
    return players;
  };

  const groupedPlayersByPools = () => {
    const players = getPlayers();

    const pools = players.reduce((acc, player) => {
      if (acc[player.pool]) {
        acc[player.pool] = [...acc[player.pool], player];
      } else {
        acc[player.pool] = [player];
      }
      return acc;
    }, {});

    return pools;
  };

  const pushSearch = tab => {
    const newSearch = { ...queryString.parse(searchString), tab };
    history.push({ pathname, search: queryString.stringify(newSearch) });
  };

  return (
    <div>
      <Subheader
        selectedTab={tab}
        onSelectTab={pushSearch}
        data={SubheaderData}
      />
    </div>
  );
};

export default withRouter(Home);
