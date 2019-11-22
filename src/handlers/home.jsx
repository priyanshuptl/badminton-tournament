import React from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { SubheaderData, DefaultValues, UrlStrings } from "../static";
import Subheader from "../components/subheader";
import Pools from "../layout/pools";
import Schedule from "../layout/schedule";
import Brackets from "../layout/brackets";

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
    tab = DefaultValues.TAB,
    showInterpoolMatches = true
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

  const pushSearch = (key, value) => {
    const newSearch = {
      ...queryString.parse(searchString),
      [key]: value
    };
    history.push({ pathname, search: queryString.stringify(newSearch) });
  };

  const getFinalizedTeamsLength = topTeamsLength => {
    let i = 0;
    let powerOf2 = 0;
    let finalLength = 0,
      n = 0;

    while (powerOf2 <= topTeamsLength) {
      finalLength = powerOf2;
      n = i;
      if (powerOf2 === topTeamsLength) {
        return { finalLength, n };
      }
      i++;
      powerOf2 = Math.pow(2, i);
    }
    return { finalLength, n };
  };

  const getKnockOutMatches = pools => {
    const schedule = {};
    const topTeamsLength = Object.keys(pools).length * qualifiersCountPerPool;
    const { n } = getFinalizedTeamsLength(topTeamsLength);

    for (let i = n; i >= 1; i--) {
      if (i === 1) {
        schedule["Final"] = [
          { 1: "Final Match", space: "", date: "21 May 2019" }
        ];
      } else if (i === 2) {
        schedule["Semi-finals"] = [
          { 1: "Semi-final 1", space: "", date: "21 May 2019" },
          { 2: "Semi-final 2", space: "", date: "21 May 2019" }
        ];
      } else {
        const knockOutMatches = [];
        for (let j = 1; j <= Math.pow(2, i) / 2; j++) {
          knockOutMatches.push({
            [i]: "Match " + j,
            space: "",
            date: "21 May 2019"
          });
        }
        schedule["Knock Out Round " + (n - i + 1)] = knockOutMatches;
      }
    }

    return schedule;
  };

  const getInterpoolMatches = pools =>
    Object.keys(pools).reduce((acc, poolKey) => {
      const players = pools[poolKey];
      const matches = [];
      for (let i = 0; i < players.length - 1; i++) {
        for (let j = i + 1; j < players.length; j++) {
          matches.push({
            player1: players[i].name,
            type: "vs",
            player2: players[j].name,
            space: "",
            date: "20 May 2019"
          });
        }
      }
      acc[poolKey] = matches;
      return acc;
    }, {});

  const getSchedule = () => {
    const pools = getGroupedPlayersByPools();

    const schedule = getInterpoolMatches(pools);

    return { ...schedule, ...getKnockOutMatches(pools) };
  };

  const getBracketsData = () => {
    const pools = getGroupedPlayersByPools();
    const knockOutMatches = getKnockOutMatches(pools);

    const brackets = Object.values(knockOutMatches).map(matches =>
      matches.map(() => [
        {
          user: "Player X",
          isWinner: true
        },
        {
          user: "Player X"
        }
      ])
    );

    const interpoolBrackets =
      showInterpoolMatches === "true" || showInterpoolMatches === true
        ? [
            Object.values(getInterpoolMatches(pools)).reduce(
              (acc, schedule) => {
                const matches = schedule.map(match => [
                  {
                    user: match.player1
                  },
                  {
                    user: match.player2
                  }
                ]);

                acc.push(...matches);

                return acc;
              },
              []
            )
          ]
        : [];

    return [...interpoolBrackets, ...brackets];
  };

  return (
    <div>
      <Subheader
        selectedTab={tab}
        onSelectTab={tab => pushSearch("tab", tab)}
        data={SubheaderData}
      />
      {tab === UrlStrings.POOLS ? (
        <Pools pools={getGroupedPlayersByPools()} columns={poolTableColumns} />
      ) : tab === UrlStrings.SCHEDULE ? (
        <Schedule schedule={getSchedule()} />
      ) : tab === UrlStrings.BRACKET ? (
        <Brackets
          data={getBracketsData()}
          showInterpoolMatches={
            showInterpoolMatches === "true" || showInterpoolMatches === true
          }
          toggleShowInterpoolMatches={() =>
            pushSearch(
              "showInterpoolMatches",
              !(
                showInterpoolMatches === "true" || showInterpoolMatches === true
              )
            )
          }
        />
      ) : null}
    </div>
  );
};

export default withRouter(Home);
