require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;
const API = process.env.API;

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
        return new HDWalletProvider(MNEMONIC, API);
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
