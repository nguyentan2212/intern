const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();

const MNEMONIC = "prepare tomorrow dinosaur edge topple creek honey safe cover large rate across";
const API_KEY = "421a33358aa84cae80bbdce80b14854e";

console.log(process.env.MNEMONIC);
module.exports = {
  contracts_build_directory: "./client/contracts",
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
      version: "0.5.1"
    }
  },
  db: {
    enabled: false
  }
};
