import React from "react";

const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: "scroll",
        height: "600px",
        marginTop: "100px",
        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
        display: "none",
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
