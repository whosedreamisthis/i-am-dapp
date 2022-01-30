var SeekerToken = artifacts.require("./SeekerToken.sol");

module.exports = function (deployer) {
  deployer.deploy(SeekerToken, "SeekerToken", "SKT").then((address) => {
    console.log("contract address", address);
  });
};
