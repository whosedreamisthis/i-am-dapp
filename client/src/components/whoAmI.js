import React, { useEffect, useRef, useState } from "react";
import "./whoAmI.css";
const WhoAmI = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ref = useRef();
  function updatePosition() {
    const element = document.querySelector("#who-am-i");
    const x = 300 + Math.random() * (window.innerWidth - 600);
    const y = 300 + Math.random() * (window.innerHeight - 600);
    setPosition({ x: x, y: y });
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
    console.log("update position ", position.x, position.y);
  }
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("mouseover", updatePosition, false);
      return function cleanup() {
        ref.current.removeEventListener("mouseover", updatePosition, false);
      };
    }
  }, [ref]);

  return (
    <h1
      ref={ref}
      className="who-am-i"
      id="who-am-i"
      onMouseOver={updatePosition}
    >
      Who am I?
    </h1>
  );
};

export default WhoAmI;