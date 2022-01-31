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

const PATHS = {
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

const HEIGHTS = [200, 450, 700, 1000, 1300, 1600, 1900, 2200, 2500, 2800];

const BUSTED_PIXEL_WIDTH = 3000;
const BUSTED_PIXEL_HEIGHT = 3000;
const MAX_NUM_AFFIRMATIONS = 5;

function buildAffirmation(p) {
  return `<text
  font-size="200"
  x="${p.x}"
  y="${p.y}"
  fill="${p.fill}"
>

I am ${p.affirmation}
</text>`;
}

function createRandomAffirmations(seekerDetails) {
  const shuffledAffirmations = AFFIRMATIONS.sort(() => 0.5 - Math.random());

  const shuffledHeights = HEIGHTS.sort(() => 0.5 - Math.random());

  const affirmations = [];

  for (let level = 0; level < seekerDetails.numAffirmations; level++) {
    affirmations.push({
      affirmation: shuffledAffirmations[level],
      x: 200 + Math.random() * BUSTED_PIXEL_WIDTH * 0.5,
      y: shuffledHeights[level],
      fill: seekerDetails.color,
      duration: 1 + Math.random() * 3,
      begin: Math.random() * 2,
    });
  }

  let newArray = affirmations.map((affirmation) => {
    return buildAffirmation(affirmation);
  });
  return newArray;
}
function createAffirmationElements(seekerDetails) {
  console.log(seekerDetails);

  return createRandomAffirmations(seekerDetails);
  // if (seekerDetails.path === PATHS.south) {
  //   return createSouthAffirmations(seekerDetails);
  // }
  // if (seekerDetails.path === PATHS.north) {
  //   return createNorthAffirmations(seekerDetails);
  // }
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
    numAffirmations: Math.floor(Math.random() * MAX_NUM_AFFIRMATIONS) + 1,
    background: background,
    color: color,
    path: Math.floor(Math.random() * PATHS.length),
  };
  console.log("seekerDetails", seekerDetails);
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
