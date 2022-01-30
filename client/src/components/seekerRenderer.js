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

const PATH = {
  south: "south",
  southEast: "south-east",
  east: "east",
  northEast: "north-east",
  north: "north",
  northWest: "north-west",
  west: "west",
  southWest: "south-west",
  random: "random",
};

const BUSTED_PIXEL_WIDTH = 3000;
const BUSTED_PIXEL_HEIGHT = 3000;
const MAX_NUM_AFFIRMATIONS = 10;
function createAffirmations(seekerDetails) {
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
  >
  I am ${seekerDetails.affirmation}
  </text>`;
  });
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

function createSouthAffirmations(seekerDetails) {
  const startX = 100 + Math.random() * (BUSTED_PIXEL_WIDTH * 0.5);
  const startY = 100 + Math.random() * (BUSTED_PIXEL_WIDTH * 0.5 - 100);
  let randAffirmation = Math.floor(Math.random() * AFFIRMATIONS.length);
  const positions = [{ affirmation: randAffirmation, x: startX, y: startY }];
  let x = startX;
  let y = startY;
  for (let level = 1; level < seekerDetails.numAffirmations; level++) {
    x += 0;
    y += 220;
    randAffirmation = Math.floor(Math.random() * AFFIRMATIONS.length);

    positions.push({ affirmation: randAffirmation, x: x, y: y });
  }

  let newArray = positions.map((p) => {
    return `<text
    font-size="200"
    y="${p.y}"
    x="${p.x}"
  >
  I am ${AFFIRMATIONS[p.affirmation]}
  </text>`;
  });
  return newArray;
}

function createAffirmationElements(seekerDetails) {
  console.log(seekerDetails);
  return createSouthAffirmations(seekerDetails);
  // if (seekerDetails.path === PATHS.south) {
  //   return createSouthAffirmations(seekerDetails);
  // } else if (seekerDetails.path === "downLeft") {
  //   return createDownAffirmations(seekerDetails);
  // } else if (seekerDetails.path === "up") {
  //   return createDownAffirmations(seekerDetails);
  // } else if (seekerDetails.path === "upAcross") {
  //   return createDownAffirmations(seekerDetails);
  // }
}

function buildImage(seekerDetails) {
  let affirmationElements = createAffirmationElements(seekerDetails);

  return `<svg  width="300" height="300" viewBox="0 0 ${BUSTED_PIXEL_WIDTH} ${BUSTED_PIXEL_HEIGHT}" xmlns='http://www.w3.org/2000/svg'>
  <rect
      width="100%"
      height="100%"
      fill="${seekerDetails.background}"
    />
    ${affirmationElements}

    </svg>`;
}

export function createRandomSeeker() {
  const isLight = Math.random() > 0.5;
  const background = isLight
    ? lightColors[Math.floor(Math.random() * lightColors.length)]
    : darkColors[Math.floor(Math.random() * darkColors.length)];
  const color = isLight ? "#000000" : "#ffffff";

  let seekerDetails = {
    numAffirmations: Math.floor(Math.random() * MAX_NUM_AFFIRMATIONS),
    background: background,
    color: color,
    path: Math.floor(Math.random() * PATH.length),
  };

  const encodedSeekerData = buildImage(seekerDetails);
  var encodedSeekerSVG =
    "data:image/svg+xml; base64," + window.btoa(encodedSeekerData);
  return encodedSeekerSVG;
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
      <img src={JSON.parse(seeker.uri).image} />

      <div className="container row">
        <div className="card-data">
          <p className="textTitle card-data">
            NAME:
            <span className="item-value">{JSON.parse(seeker.uri).name}</span>
          </p>
          {/* <p className="textDescription card-data">ID: {seeker.id}</p> */}
        </div>
      </div>
    </div>
  );
};

export default SeekerRenderer;
