require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;
const API = process.env.API;

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
        return new HDWalletProvider(MNEMONIC, API);
      },
      network_id: 3,
      gas: 4000000
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
