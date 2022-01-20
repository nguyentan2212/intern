var Web3WsProvider = require('web3-providers-ws');
const Web3 = require("web3");
const private = require("../../private.json");
const privateKey = private.privateKey;
const api = private.api;
const endPoint = private.environment == "development" ? "ws://127.0.0.1:7545" : api;

function loadAccount() {
  const provider = new Web3WsProvider(endPoint);
  console.log(endPoint);
  const web3js = new Web3(provider);

  const { address: ownerAddress } = web3js.eth.accounts.privateKeyToAccount(privateKey);

  return { ownerAddress, web3js };
}

module.exports = {
  loadAccount
};
