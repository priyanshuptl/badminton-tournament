import React from "react";
import { ReactTournament } from "react-tournament";

const Brackets = ({
  data,
  showInterpoolMatches,
  toggleShowInterpoolMatches
}) => (
  <div className="brackets-container">
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
