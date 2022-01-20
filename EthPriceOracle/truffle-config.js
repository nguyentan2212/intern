const HDWalletProvider = require("truffle-hdwallet-provider");
const private = require("./private.json");

const MNEMONIC = private.mnemonic;
const API_KEY = private.apiKey;

console.log(process.env.MNEMONIC);
module.exports = {
  contracts_build_directory: "./server/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/" + API_KEY);
      },
      network_id: 3,
      gas: 8000000 //make sure this gas allocation isn't over 4M, which is the max
    }
  },

  mocha: {},
  compilers: {
    solc: {
      version: "0.8.11"
    }
  },
  db: {
    enabled: false
  }
};
