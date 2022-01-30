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

export function getSVG(dna, level) {
  let dnaStr = String(dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  const isLight = dnaStr.substring(0, 1) % 2;
  const background = isLight
    ? lightColors[dnaStr.substring(1, 2) % lightColors.length]
    : darkColors[dnaStr.substring(1, 2) % darkColors.length];

  let a = AFFIRMATIONS[dnaStr.substring(2, 4) % AFFIRMATIONS.length];
  let pixelDetails = {
    affirmation: a,
    background: background,
    xOffset:
      100 +
      (dnaStr.substring(3, 7) % (BUSTED_PIXEL_WIDTH - 90 * (a.length + 5))), // (dnaStr.substring(3, 7) % (BUSTED_PIXEL_WIDTH * 0.7)),
    yOffset: 100 + (dnaStr.substring(7, 11) % (BUSTED_PIXEL_HEIGHT - 300)),
    doOffsetX: dnaStr.substring(7, 8) % 2 == 0,
  };
  const fill = isLight ? "#000000" : "#ffffff";
  const encodedData = `<svg  width="100%" height="300" viewBox="0 0 ${BUSTED_PIXEL_WIDTH} ${BUSTED_PIXEL_HEIGHT}" xmlns='http://www.w3.org/2000/svg'>
  <rect
      width="100%"
      height="100%"
      fill="${pixelDetails.background}"
    />
    <text
        font-size="200"
        y="${pixelDetails.yOffset}"
        x="${pixelDetails.xOffset}"
        fill="${fill}"
      >
      I am ${a}
      </text>
    </svg>`;

  var b64 = "data:image/svg+xml; base64," + window.btoa(encodedData);
  console.log(encodedData, b64, pixelDetails);

  //data:image/svg+xml;base64,
  // Encode the SVG as base64

  return b64;
}
const PixelRenderer = ({
  pixel = null,
  size = 200,
  style,
  loading,
  isAtMaxLevel,
  levelUpPixel,
  blockchain,
  isOwner,
}) => {
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
    // console.log("x y", x, y);
    // console.log(x > 0 ? x - BUSTED_PIXEL_WIDTH : x + BUSTED_PIXEL_WIDTH, y);
    // console.log(x - BUSTED_PIXEL_WIDTH, y - BUSTED_PIXEL_HEIGHT);
    // console.log(x, y - BUSTED_PIXEL_HEIGHT);

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

      <div className="container row">
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
        <button
          disabled={
            loading || isAtMaxLevel(pixel.level) || !isOwner(pixel) ? 1 : 0
          }
          onClick={(e) => {
            e.preventDefault();
            levelUpPixel(blockchain.account, pixel.id);
          }}
        >
          Level Up
        </button>
      </div>
    </div>
  );
};

export default PixelRenderer;
