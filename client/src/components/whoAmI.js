import React, { useEffect, useRef, useState } from "react";
import "./whoAmI.css";
const WhoAmI = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ref = useRef();
  function updatePosition() {
    const element = document.querySelector("#who-am-i");
    const x = 100 + Math.random() * (window.innerWidth - 200);
    const y = 100 + Math.random() * (window.innerHeight - 200);
    const h = Math.random() * 360;
    setPosition({ x: x, y: y });

    // element.style.color = `hsl(${h},40%,20%)`;
  }
  // useEffect(() => {
  //   if (ref && ref.current) {
  //     ref.current.addEventListener("mouseover", updatePosition, false);
  //     return function cleanup() {
  //       if (ref && ref.current) {
  //         ref.current.removeEventListener("mouseover", updatePosition, false);
  //       }
  //     };
  //   }
  // }, [ref]);

  return (
    <h1 ref={ref} className="who-am-i" id="who-am-i">
      Who am I?
    </h1>
  );
};

export default WhoAmI;
