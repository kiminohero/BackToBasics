import React from "react";

const Options = ({ value, selctOpt, hide, success }) => {
  let content = hide === true ? "?" : value;
  const onClick = async () => {
    try {
      if (hide === true) {
        await selctOpt(value);
        content = value;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button
        className={hide ? "opt" : "opt dont-click"}
        onClick={onClick}
        style={
          success !== null
            ? success
              ? { boxShadow: `0 0 4px 14px green` }
              : { boxShadow: `0 0 4px 14px indianred` }
            : null
        }
      >
        {content}
      </button>
    </div>
  );
};

export default Options;
