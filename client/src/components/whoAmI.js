import React, { useEffect, useRef } from "react";
import "./whoAmI.css";
const WhoAmI = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("mouseover", () => {
        ref.current.style.top = `${
          Math.random() * (window.innerHeight - 200)
        }px`;
        ref.current.style.left = `${
          Math.random() * (window.innerWidth - 200)
        }px`;
        console.log("mouseover");
      });
    }
  }, [ref.current]);
  return (
    <h1 ref={ref} className="who-am-i">
      Who am I?
    </h1>
  );
};

export default WhoAmI;
