const SLEEP_INTERVAL = 2000;
const CHUNK_SIZE = 3;
const MAX_RETRIES = 5;
const common = require("./utils/common");
const axios = require("axios");
const BN = require("bn.js");
const EthPriceOracle = require("./contracts/EthPriceOracle.json");

var pendingRequests = [];

async function getOracleContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  return new web3js.eth.Contract(EthPriceOracle.abi, EthPriceOracle.networks[networkId].address);
}

async function filterEvents(oracleContract, web3js) {
  oracleContract.events.GetLatestEthPriceEvent(async (err, event) => {
    if (err) {
      console.error("Error on event", err);
      return;
    }
    console.log("Oracle GetLatestEthPriceEvent!");
    await addRequestToQueue(event);
  });

  oracleContract.events.SetLatestEthPriceEvent(async (err, event) => {
    if (err) console.error("Error on event", err);
    // Do something
  });
}

async function retrieveLatestEthPrice() {
  const resp = await axios({
    url: "https://api.binance.com/api/v3/ticker/price",
    params: {
      symbol: "ETHUSDT"
    },
    method: "get"
  });
  return resp.data.price;
}

async function addRequestToQueue(event) {
  const callerAddress = event.returnValues.callerAddress;
  const id = event.returnValues.id;
  pendingRequests.push({ callerAddress, id });
}

async function processQueue(oracleContract, ownerAddress) {
  let processedRequests = 0;
  while (pendingRequests.length > 0 && processedRequests < CHUNK_SIZE) {
    const req = pendingRequests.shift();
    await processRequest(oracleContract, ownerAddress, req.id, req.callerAddress);
    processedRequests++;
  }
}

async function processRequest(oracleContract, ownerAddress, id, callerAddress) {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const ethPrice = await retrieveLatestEthPrice();
      await setLatestEthPrice(oracleContract, callerAddress, ownerAddress, ethPrice, id);
      console.log("Oracle setLatestEthPrice!");
      return;
    } catch (error) {
      if (retries === MAX_RETRIES - 1) {
        await setLatestEthPrice(oracleContract, callerAddress, ownerAddress, "0", id);
        return;
      }
      retries++;
    }
  }
}

async function setLatestEthPrice(oracleContract, callerAddress, ownerAddress, ethPrice, id) {
  ethPrice = ethPrice.replace(".", "");
  const multiplier = new BN(10 ** 10, 10);
  const ethPriceInt = new BN(parseInt(ethPrice), 10).mul(multiplier);
  const idInt = new BN(parseInt(id));
  try {
    await oracleContract.methods.setLatestEthPrice(ethPriceInt.toString(), callerAddress, idInt.toString()).send({ from: ownerAddress, gas: 3000000 });
  } catch (error) {
    console.log("Error encountered while calling setLatestEthPrice.", error);
    // Do some error handling
  }
}

async function init() {
  const { ownerAddress, web3js } = common.loadAccount();
  const oracleContract = await getOracleContract(web3js);
  filterEvents(oracleContract, web3js);
  console.log("Oracle init!");
  return { oracleContract, ownerAddress, web3js };
}

(async () => {
  const { oracleContract, ownerAddress, web3js } = await init();
  // const oracleRole = web3js.utils.asciiToHex("ORACLE");
  // const result = await oracleContract.methods.hasRole(oracleRole, ownerAddress).call({ from: ownerAddress });
  // if (result == false) {
  //   oracleContract.methods.addOracle(ownerAddress).send({ from: ownerAddress, gas: 3000000 });
  // }
  await oracleContract.methods.setThreshold(1).send({ from: ownerAddress, gas: 3000000 });
  process.on("SIGINT", () => {
    console.log("Calling client.disconnect()");
    process.exit();
  });
  console.log("Oracle start!");
  setInterval(async () => {
    await processQueue(oracleContract, ownerAddress);
  }, SLEEP_INTERVAL);
})();
