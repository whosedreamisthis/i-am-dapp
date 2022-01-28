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

const BUSTED_PIXEL_WIDTH = 3000;
const BUSTED_PIXEL_HEIGHT = 3000;
const PixelRenderer = ({ pixel = null, size = 200, style }) => {
  if (!pixel) {
    return null;
  }

  let dnaStr = String(pixel.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  const isLight = dnaStr.substring(0, 1) % 2;
  const background = isLight
    ? lightColors[dnaStr.substring(1, 2) % lightColors.length]
    : darkColors[dnaStr.substring(1, 2) % darkColors.length];

  let pixelDetails = {
    affirmation: dnaStr.substring(2, 4) % AFFIRMATIONS.length,
    background: background,
    xOffset: +dnaStr.substring(3, 6) * 1.5 + 200,
    yOffset: +dnaStr.substring(6, 9) * 1.5 + 200,
    doOffsetX: dnaStr.substring(7, 8) % 2 == 0,
  };

  // console.log(
  //   dnaStr,
  //   dnaStr.substring(3, 6),
  //   dnaStr.substring(6, 9),
  //   pixelDetails.xOffset,
  //   pixelDetails.yOffset
  // );

  const affirmations = [];
  for (let level = 0; level < pixel.level; level++) {
    let x = 100;
    let y = pixelDetails.yOffset + level * 220;

    if (pixelDetails.doOffsetX) {
      if (pixelDetails.xOffset > 1500) {
        x = pixelDetails.xOffset - level * 220;
      } else {
        x = pixelDetails.xOffset + level * 220;
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
        I am {AFFIRMATIONS[pixelDetails.affirmation]}
      </text>
    );
    if (pixelDetails.doOffsetX) {
      affirmations.push(
        <text
          fontSize="200"
          id={`affirmation${affirmations.length}`}
          y={y}
          x={x > 0 ? x - BUSTED_PIXEL_WIDTH : x + BUSTED_PIXEL_WIDTH}
          fill={isLight ? "#000000" : "#ffffff"}
        >
          I am {AFFIRMATIONS[pixelDetails.affirmation]}
        </text>
      );

      affirmations.push(
        <text
          fontSize="200"
          id={`affirmation${affirmations.length}`}
          y={y - BUSTED_PIXEL_HEIGHT}
          x={x - BUSTED_PIXEL_WIDTH}
          fill={isLight ? "#000000" : "#ffffff"}
        >
          I am {AFFIRMATIONS[pixelDetails.affirmation]}
        </text>
      );
    } else {
      affirmations.push(
        <text
          fontSize="200"
          id={`affirmation${affirmations.length}`}
          y={y - BUSTED_PIXEL_HEIGHT}
          x={x}
          fill={isLight ? "#000000" : "#ffffff"}
        >
          I am {AFFIRMATIONS[pixelDetails.affirmation]}
        </text>
      );
    }
  }
  return (
    <div className="card columns">
      <svg
        id="capture"
        className="svg"
        viewBox={`0 0 ${BUSTED_PIXEL_WIDTH} ${BUSTED_PIXEL_HEIGHT}`}
        width="100%"
        height="300px"
      >
        <rect
          width={BUSTED_PIXEL_WIDTH}
          height={BUSTED_PIXEL_HEIGHT}
          fill={pixelDetails.background}
        />

        {affirmations}
      </svg>
      <div className="card-data">
        <p className="textDescription card-data">
          NAME: <span className="item-value">{pixel.name}</span>
        </p>
        {/* <p className="textDescription card-data">ID: {pixel.id}</p> */}
        <p className="textDescription card-data">
          DNA: <span className="item-value">{pixel.dna}</span>
        </p>
        <p className="textDescription card-data">
          LEVEL: <span className="item-value">{pixel.level}/10</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default PixelRenderer;
