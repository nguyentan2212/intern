const common = require("./utils/common.js");
const SLEEP_INTERVAL = 2000;
const CallerJSON = require("./contracts/CallerContract.json");
const OracleJSON = require("./contracts/EthPriceOracle.json");

async function getCallerContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  const contract = new web3js.eth.Contract(CallerJSON.abi, CallerJSON.networks[networkId].address);
  return contract;
}

async function filterEvents(callerContract) {
  callerContract.events.PriceUpdatedEvent(async (err, event) => {
    if (err) console.error("Error on event", err);
    console.log("* New PriceUpdated event. ethPrice: " + event.returnValues.ethPrice);
  });
  callerContract.events.ReceivedNewRequestIdEvent(async (err, event) => {
    if (err) console.error("Error on event", err);
  });
}

async function init() {
  const { ownerAddress, web3js } = common.loadAccount();
  const callerContract = await getCallerContract(web3js);
  filterEvents(callerContract);
  console.log("Client init");
  return { callerContract, ownerAddress, web3js };
}

(async () => {
  const { callerContract, ownerAddress, web3js } = await init();
  process.on("SIGINT", () => {
    console.log("Calling client.disconnect()");
    process.exit();
  });
  const networkId = await web3js.eth.net.getId();
  const oracleAddress = OracleJSON.networks[networkId].address;
  await callerContract.methods.setOracleInstanceAddress(oracleAddress).send({ from: ownerAddress, gas: 3000000 });
  console.log("Client start");
  setInterval(async () => {
    await callerContract.methods.updateEthPrice().send({ from: ownerAddress, gas: 3000000 });
  }, SLEEP_INTERVAL);
})();
