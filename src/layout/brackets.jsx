import React from "react";
import { ReactTournament } from "react-tournament";

const Brackets = ({
  data,
  showInterpoolMatches,
  toggleShowInterpoolMatches
}) => (
  <div>
    <input
      type="checkbox"
      checked={showInterpoolMatches}
      onChange={toggleShowInterpoolMatches}
    />
    Show Interpool matches
    <ReactTournament data={data} />
  </div>
);

export default Brackets;
