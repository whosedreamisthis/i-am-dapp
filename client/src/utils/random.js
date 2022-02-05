export const randomFloat = function () {
  const int = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return int / 2 ** 32;
};

export const randomInt = function (min, max) {
  const range = max - min;
  return Math.floor(randomFloat() * range + min);
};
