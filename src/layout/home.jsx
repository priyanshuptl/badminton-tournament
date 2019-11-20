import React from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { SubheaderData, DefaultValues, UrlStrings } from "../static";
import Subheader from "../components/subheader";
import Pools from "./pools";
import Schedule from "./schedule";

const poolTableColumns = [
  { Header: "Participant", accessor: "name" },
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
        name: "Player " + (i + 1),
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

  const getGroupedPlayersByPools = () => {
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

  const getFinalizedTeamsLength = topTeamsLength => {
    let i = 0;
    let powerOf2 = 0;
    let finalLength = 0;
    while (powerOf2 <= topTeamsLength) {
      if (powerOf2 === topTeamsLength) {
        return powerOf2;
      }
      finalLength = powerOf2;
      i++;
      powerOf2 = Math.pow(2, i);
    }
    return finalLength;
  };

  const getSchedule = () => {
    const pools = getGroupedPlayersByPools();

    // Get inter pool matches
    const schedule = Object.keys(pools).reduce((acc, poolKey) => {
      const players = pools[poolKey];
      const matches = [];
      for (let i = 0; i < players.length - 1; i++) {
        for (let j = i + 1; j < players.length; j++) {
          matches.push({
            player1: players[i].name,
            type: "vs",
            player2: players[j].name,
            date: "20 May 2019"
          });
        }
      }
      acc[poolKey] = matches;
      return acc;
    }, {});

    // Get knock out matches
    const topTeamsLength = Object.keys(pools).length * qualifiersCountPerPool;
    const finalizedTeamsLength = getFinalizedTeamsLength(topTeamsLength);
    schedule["Total Knock Outs"] = [{ finalizedTeamsLength }];
    return schedule;
  };

  return (
    <div>
      <Subheader
        selectedTab={tab}
        onSelectTab={pushSearch}
        data={SubheaderData}
      />
      {tab === UrlStrings.POOLS ? (
        <Pools pools={getGroupedPlayersByPools()} columns={poolTableColumns} />
      ) : tab === UrlStrings.SCHEDULE ? (
        <Schedule schedule={getSchedule()} />
      ) : tab === UrlStrings.BRACKET ? (
        <div>Brackets Here!</div>
      ) : null}
    </div>
  );
};

export default withRouter(Home);
