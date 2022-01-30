import React from "react";
import "../styles/card.css";
import "../styles/globalStyles.css";

const QUESTIONS = ["Who am I?", "Whose dream is this?", ""];
const AFFIRMATIONS = [
  "enough.",
  "authentic.",
  "unique.",
  "worthy.",
  "powerful.",
  "inspired.",
  "loved.",
  "lovable.",
  "whole.",
  "eternal.",
  "fun.",
  "playful.",
  "creative.",
  "connected.",
  "intuitive.",
  "supported.",
  "kind.",
  "grateful.",
  "fearless.",
  "passionate.",
  "comassionate.",
  "blessed.",
  "magic.",
  "free.",
  "protected.",
  "peaceful.",
  "generous.",
  "limitless.",
  "joyful.",
];
const lightColors = [
  "rgb(242, 204, 143)",
  "rgb(129, 178, 154)",
  "rgb(222,164,126)",
  "rgb(197,216,109)",
];
const darkColors = [
  "rgb(61, 64, 91)",
  "rgb(224, 122, 95)",
  "rgb(238,75,106)",
  "rgb(67,124,144)",
];
const allColors = [...lightColors, ...darkColors];

const SEEKER_WIDTH = 3000;
const SEEKER_HEIGHT = 3000;
const SeekerRenderer = ({ seeker = null, size = 200, style, loading }) => {
  if (!seeker) {
    return null;
  }

  console.log(seeker);
  let dnaStr = String(seeker.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  const isLight = dnaStr.substring(0, 1) % 2;
  const background = isLight
    ? lightColors[dnaStr.substring(1, 2) % lightColors.length]
    : darkColors[dnaStr.substring(1, 2) % darkColors.length];

  let seekerDetails = {
    affirmation: dnaStr.substring(2, 4) % AFFIRMATIONS.length,
    background: background,
    xOffset: +dnaStr.substring(3, 6) * 1.5 + 200,
    yOffset: +dnaStr.substring(6, 9) * 1.5 + 200,
    doOffsetX: dnaStr.substring(7, 8) % 2 == 0,
  };

  const affirmations = [];
  for (let level = 0; level < seeker.level; level++) {
    let x = 100;
    let y = seekerDetails.yOffset + level * 220;

    if (seekerDetails.doOffsetX) {
      if (seekerDetails.xOffset > 1500) {
        x = seekerDetails.xOffset - level * 220;
      } else {
        x = seekerDetails.xOffset + level * 220;
      }
    }

    affirmations.push(
      <text
        fontSize="200"
        id={`affirmation${affirmations.length}`}
        y={y}
        x={x}
        fill={isLight ? "#000000" : "#ffffff"}
      >
        I am {AFFIRMATIONS[seekerDetails.affirmation]}
      </text>
    );
    affirmations.push(
      <text
        fontSize="200"
        id={`affirmation${affirmations.length}`}
        y={y}
        x={x > 0 ? x - SEEKER_WIDTH : x + SEEKER_WIDTH}
        fill={isLight ? "#000000" : "#ffffff"}
      >
        I am {AFFIRMATIONS[seekerDetails.affirmation]}
      </text>
    );

    affirmations.push(
      <text
        fontSize="200"
        id={`affirmation${affirmations.length}`}
        y={y - SEEKER_HEIGHT}
        x={x - SEEKER_WIDTH}
        fill={isLight ? "#000000" : "#ffffff"}
      >
        I am {AFFIRMATIONS[seekerDetails.affirmation]}
      </text>
    );
    affirmations.push(
      <text
        fontSize="200"
        id={`affirmation${affirmations.length}`}
        y={y - SEEKER_HEIGHT}
        x={x}
        fill={isLight ? "#000000" : "#ffffff"}
      >
        I am {AFFIRMATIONS[seekerDetails.affirmation]}
      </text>
    );
  }
  return (
    <div className="card columns">
      <svg
        id="capture"
        className="svg"
        viewBox={`0 0 ${SEEKER_WIDTH} ${SEEKER_HEIGHT}`}
        width="100%"
        height="300px"
      >
        <rect
          width={SEEKER_WIDTH}
          height={SEEKER_HEIGHT}
          fill={seekerDetails.background}
        />

        <text
          fontFamily="san serif"
          fontSize="200"
          id={`affirmation${affirmations.length}`}
          y={300}
          x={1300}
          fill={isLight ? "#000000" : "#ffffff"}
        >
          I am emough.
          <animate
            attributeName="x"
            values={`${300};1000;${300}`}
            dur="30s"
            repeatCount="indefinite"
          />
        </text>
        {affirmations}
      </svg>

      <div className="container row">
        <div className="card-data">
          <p className="textDescription card-data">
            NAME: <span className="item-value">{seeker.name}</span>
          </p>
          <p className="textDescription card-data">
            DNA: <span className="item-value">{seeker.dna}</span>
          </p>
          <p className="textDescription card-data">
            LEVEL: <span className="item-value">{seeker.level}/10</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeekerRenderer;
