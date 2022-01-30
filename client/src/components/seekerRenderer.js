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

function createAffirmations(seekerDetails) {
  const fill = seekerDetails.isLight ? "#000000" : "#ffffff";

  const positions = [{ x: seekerDetails.xOffset, y: seekerDetails.yOffset }];
  let x = seekerDetails.xOffset;
  let y = seekerDetails.yOffset;
  for (let level = 1; level < seekerDetails.level; level++) {
    x += 220;
    y += 220;
    positions.push({ x: x, y: y });
  }

  let newArray = positions.map((p) => {
    return `<text
    font-size="200"
    y="${p.x}"
    x="${p.y}"
    fill="${fill}"
  >
  I am ${seekerDetails.affirmation}
  </text>`;
  });
  console.log(newArray);
  return newArray;
}
function buildAffirmation(seekerDetails, x, y) {
  const affirmations = [];
  const fill = seekerDetails.isLight ? "#000000" : "#ffffff";

  return `<text
  font-size="200"
  y="${seekerDetails.yOffset + x}"
  x="${seekerDetails.xOffset + y}"
  fill="${fill}"
>
I am ${seekerDetails.affirmation}
</text>`;
}

function buildImage(seekerDetails) {
  let affirmations = createAffirmations(seekerDetails);

  return `<svg  width="300" height="300" viewBox="0 0 ${BUSTED_PIXEL_WIDTH} ${BUSTED_PIXEL_HEIGHT}" xmlns='http://www.w3.org/2000/svg'>
  <rect
      width="100%"
      height="100%"
      fill="${seekerDetails.background}"
    />
    ${affirmations}

    </svg>`;
}
export function getSVG(dna) {
  let dnaStr = String(dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  const isLight = dnaStr.substring(0, 1) % 2;
  const background = isLight
    ? lightColors[dnaStr.substring(1, 2) % lightColors.length]
    : darkColors[dnaStr.substring(1, 2) % darkColors.length];

  let a = AFFIRMATIONS[dnaStr.substring(2, 4) % AFFIRMATIONS.length];
  let seekerDetails = {
    affirmation: a,
    background: background,
    xOffset:
      100 +
      (dnaStr.substring(3, 7) % (BUSTED_PIXEL_WIDTH - 90 * (a.length + 5))), // (dnaStr.substring(3, 7) % (BUSTED_PIXEL_WIDTH * 0.7)),
    yOffset: 100 + (dnaStr.substring(7, 11) % (BUSTED_PIXEL_HEIGHT - 300)),
    doOffsetX: dnaStr.substring(7, 8) % 2 == 0,
    isLight: isLight,
    level: 5,
  };
  const encodedData = buildImage(seekerDetails);

  var b64 = "data:image/svg+xml; base64," + window.btoa(encodedData);
  console.log(encodedData, b64, seekerDetails);

  //data:image/svg+xml;base64,
  // Encode the SVG as base64

  return b64;
}
const SeekerRenderer = ({
  seeker = null,
  size = 200,
  style,
  loading,
  isAtMaxLevel,
  blockchain,
  isOwner,
}) => {
  if (!seeker) {
    return null;
  }

  return (
    <div className="card columns">
      <img src={seeker.uri} />

      <div className="container row">
        <div className="card-data">
          <p className="textDescription card-data">
            NAME: <span className="item-value">{seeker.name}</span>
          </p>
          {/* <p className="textDescription card-data">ID: {seeker.id}</p> */}
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
