import React from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { SubheaderData, DefaultValues, UrlStrings } from "../static";
import Subheader from "../components/subheader";
import Pools from "./pools";

const columns = [
  { Header: "Participant", accessor: "participant" },
  { Header: "W-L-T", accessor: "wlt" },
  { Header: "TB", accessor: "tb" },
  { Header: "Set Wins", accessor: "setWins" },
  { Header: "Set Ties", accessor: "setTies" },
  { Header: "Points", accessor: "points" }
];

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
        participant: "Player " + (i + 1),
        pool: `Pool ${parseInt(i % poolsCount) + 1}`,
        wlt: "0-0-0",
        tb: 0,
        setWins: 0,
        setTies: 0,
        points: 0
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
      {tab === UrlStrings.POOLS && (
        <Pools pools={groupedPlayersByPools()} columns={columns} />
      )}
    </div>
  );
};

export default withRouter(Home);
