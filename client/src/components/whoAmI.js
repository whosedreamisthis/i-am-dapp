import React, { useEffect, useState } from "react";
import "./whoAmI.css";
const WhoAmI = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <h1 className="who-am-i" id="who-am-i">
      Who am I?
    </h1>
  );
};

export default WhoAmI;
