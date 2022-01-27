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
  "rgb(244, 241, 222)",
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
    if (y > 3000) {
      y -= 3000;
    }
    if (pixelDetails.doOffsetX) {
      x = pixelDetails.xOffset + level * 220;
      if (x > 3000) {
        x -= 3000;
      }
    }
    affirmations.push(
      <text
        fontSize="200"
        id="svg_2"
        y={y}
        x={x}
        fill={isLight ? "#000000" : "#ffffff"}
      >
        I am {AFFIRMATIONS[pixelDetails.affirmation]}
      </text>
    );
  }
  return (
    <div className="card columns">
      <svg className="svg" viewBox="0 0 3000 3000" width="100%" height="300px">
        <rect width="3000" height="3000" fill={pixelDetails.background} />
        {affirmations}
      </svg>
      <div className="card-data">
        <p className="textDescription card-data">ID: {pixel.id}</p>
        <p className="textDescription card-data">DNA: {pixel.dna}</p>
        <p className="textDescription card-data">LEVEL: {pixel.level}</p>
        <p className="textDescription card-data">NAME: {pixel.name}</p>
      </div>
    </div>
  );
};

export default PixelRenderer;
