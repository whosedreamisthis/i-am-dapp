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
  "honest.",
  "fun.",
  "playful.",
  "creative.",
  "connected.",
  "intuitive.",
  "supported.",
  "supportive.",
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
  "beautiful.",
  "abundant.",
  "confident.",
  "strong.",
  "radiant.",
  "resilient.",
  "healthy.",
];
const lightColors = [
  "rgb(242, 204, 143)",
  "rgb(129, 178, 154)",
  "rgb(222,164,126)",
  "rgb(197,216,109)",
  "rgb(167,190,211)",
  "rgb(255,222,60)",
  "rgb(115,226,167)",
];
const darkColors = [
  "rgb(61, 64, 91)",
  "rgb(224, 122, 95)",
  "rgb(238,75,106)",
  "rgb(67,124,144)",
  "rgb(159,126,105)",
  "rgb(21,122,110)",
  "rgb(73,159,104)",
  "rgb(165,70,87)",
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

const numAffirmationsProbabilities = [1 / 3, 4 / 15, 1 / 5, 2 / 15, 1 / 15];
const numAffirmationsProbAcc = [5 / 15, 9 / 15, 12 / 15, 14 / 15, 1];

const HEIGHTS = [250, 550, 850, 1150, 1400, 1700, 2000, 2300, 2600, 2900];

const BUSTED_PIXEL_WIDTH = 3000;
const BUSTED_PIXEL_HEIGHT = 3000;
const MAX_NUM_AFFIRMATIONS = 5;

const btoa = function (str) {
  return Buffer.from(str).toString("base64");
};

function buildAffirmation(p) {
  return `<text font-size="200" x="${p.x}" y="${p.y}" fill="${p.fill}">I am ${p.affirmation}</text>`;
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
    });
  }

  let newArray = affirmations.map((affirmation) => {
    return buildAffirmation(affirmation);
  });
  return newArray;
}

function buildImage(seekerDetails) {
  let affirmationElements = createRandomAffirmations(seekerDetails);

  return `<svg  width="300" height="300" viewBox="0 0 ${BUSTED_PIXEL_WIDTH} ${BUSTED_PIXEL_HEIGHT}" xmlns='http://www.w3.org/2000/svg'> <rect width="100%" height="100%" fill="${seekerDetails.background}"/>${affirmationElements}</svg>`;
}

export function createRandomSeeker() {
  const isLight = Math.random() > 0.5;
  const background = isLight
    ? lightColors[Math.floor(Math.random() * lightColors.length)]
    : darkColors[Math.floor(Math.random() * darkColors.length)];
  const color = isLight ? "#000000" : "#ffffff";

  let rand = Math.random();
  let i;
  for (i = 0; i < numAffirmationsProbAcc.length; i++) {
    if (rand < numAffirmationsProbAcc[i]) {
      break;
    }
  }
  let seekerDetails = {
    numAffirmations: i + 1,
    background: background,
    color: color,
  };
  const seekerData = buildImage(seekerDetails);
  var encodedSeekerSVG = "data:image/svg+xml;base64," + btoa(seekerData);
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

  try {
    console.log(seeker.uri);
    const uriMeta = JSON.parse(window.atob(seeker.uri.split(",")[1]));
    return (
      <div className="card columns">
        <img className="imageContainer" src={uriMeta.image} />
        <div className="container row">
          <div className="card-data">
            <p className="textTitle card-data">
              <span className="item-value">{uriMeta.name}</span>
            </p>
            {/* <p className="textDescription card-data">ID: {seeker.id}</p> */}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }

  return <h1>hello</h1>;
};

export default SeekerRenderer;
