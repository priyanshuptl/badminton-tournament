import React from "react";
import Panel from "../components/collapsible-panel";
import Row from "../components/row";

const Schedule = ({ schedule = {} }) => {
  return (
    <div className="schedule">
      {Object.keys(schedule).map(poolKey => (
        <Panel
          key={"schedule-" + poolKey}
          title={poolKey}
          contentOverflow="scroll"
        >
          {schedule[poolKey].map((match, index) => (
            <Row key={"schedule-row-" + poolKey + "-" + index} row={match} />
          ))}
        </Panel>
      ))}
    </div>
  );
};

export default Schedule;
