const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5778",
    },

    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.mnemonic,
          "https://rinkeby.infura.io/v3/eb1a083277de48e1b6b9d1749a079e4e"
        );
      },
      network_id: 4,
      gas: 4000000, //may be 21000 - 3000000
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://goerli.infura.io/v3/09478ab8fce742058c7f0351d40e456d"
        );
      },
      network_id: 5, // Goerli's id
      gas: 7500000,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        optimizer: {
          enabled: true,
          runs: 1500,
        },
      }, // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    },
  },
};
