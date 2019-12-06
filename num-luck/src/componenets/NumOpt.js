import React from "react";
import Options from "./Options";

const NumOpt = ({ opts, clickedOpt, hide, success }) => {
  return (
    <div>
      <h3>Choose to see your Luck</h3>
      <div className="numOpt">
        {Object.keys(opts).map(value => {
          return (
            <Options
              key={value}
              value={opts[value]}
              selctOpt={clickedOpt}
              hide={hide}
              success={success}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NumOpt;
