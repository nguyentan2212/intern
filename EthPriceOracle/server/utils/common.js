const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
var Web3WsProvider = require('web3-providers-ws');
const Web3 = require("web3");
const privateKey = process.env.PRIVATE_KEY;
const websocket = process.env.DEVELOPMENT ? process.env.LOCAL_WEBSOCKET : process.env.INFURA_WEBSOCKET;

function loadAccount() {
  console.log(websocket);
  const provider = new Web3WsProvider(websocket);
  console.log(websocket);
  const web3js = new Web3(provider);

  const { address: ownerAddress } = web3js.eth.accounts.privateKeyToAccount(privateKey);

  return { ownerAddress, web3js };
}

module.exports = {
  loadAccount
};
