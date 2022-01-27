import React, { useEffect, useRef } from "react";
import "./whoAmI.css";
const WhoAmI = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("mouseover", () => {
        ref.current.style.position = "absolute";
        ref.current.style.top = `${Math.random() * window.innerHeight}px`;
        ref.current.style.left = `${Math.random() * window.innerWidth}px`;
        console.log("mouseover");
      });
    }
  }, [ref.current]);
  return (
    <h1 ref={ref} className="who-am-i">
      WHO AM I?
    </h1>
  );
};

export default WhoAmI;
