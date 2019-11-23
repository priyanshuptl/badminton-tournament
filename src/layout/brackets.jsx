import React from "react";
import { ReactTournament } from "react-tournament";

const bracketStyle = {
  primary: {
    default: "#717172",
    dark: "#444446",
    darkest: "#2b2b2b",
    light: "#525458"
  },
  success: {
    default: "#4b4b4d",
    dark: "#3d3d3f",
    darkest: "#282829",
    light: "#444444"
  },
  fail: {
    default: "#717172",
    dark: "#444446",
    darkest: "#2b2b2b",
    light: "#525458"
  },
  textSmall: "12px",
  textMedium: "16px",
  textLarge: "22px",

  textDark: "#ffffff",

  textLight: "#ffffff"
};

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
    <ReactTournament data={data} theme={bracketStyle} />
  </div>
);

export default Brackets;
