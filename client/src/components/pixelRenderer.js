import React from "react";

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
  };

  return (
    <div id="frame1">
      <svg
        style={{ borderRadius: "10px", marginBottom: "20px" }}
        viewBox="0 0 3000 3000"
        width="300px"
        height="300px"
      >
        <rect width="3000" height="3000" fill={pixelDetails.background} />
        <text
          fontSize="200"
          id="svg_2"
          y="762.50056"
          x="425.00049"
          fill={isLight ? "#000000" : "#ffffff"}
        >
          I am {AFFIRMATIONS[pixelDetails.affirmation]}
        </text>
      </svg>
    </div>
  );
};

export default PixelRenderer;
