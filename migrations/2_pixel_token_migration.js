var PixelToken = artifacts.require("./PixelToken.sol");

module.exports = function (deployer) {
  deployer.deploy(PixelToken, "PixelTokens", "PXT").then((address) => {
    console.log("contract address", address);
  });
};
