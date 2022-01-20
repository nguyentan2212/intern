var web3Provider = null;
var web3 = null;
var cryptoZombies = null;
var userAccount = null;

async function init() {
  
  if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access");
    }
  }
  else if (window.web3) {
    web3Provider = window.web3.currentProvider;
  }
  else {
    web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
  }
  web3 = new Web3(web3Provider);
  console.log("init app");
  initContract();
}

function initContract() {
  $.getJSON("./contracts/ZombieOwnership.json", function (data) {
    cryptoZombies = TruffleContract(data);
    cryptoZombies.setProvider(web3Provider);
    display();
  });
  console.log("init contract");

  bindEvents();
}

function bindEvents() {
  $(document).on("click", ".btn-create", createRandomZombie);
  $(document).on("click", ".btn-levelup", levelUp);
}

function display() {
  setInterval(function () {
    if (web3.eth.accounts[0] !== userAccount) {
      userAccount = web3.eth.accounts[0];
      $("#userAccount").text(`User ${userAccount}`);
      getZombiesByOwner(userAccount).then(displayZombies);
    }
  }, 100);
}

function displayZombies(ids) {
  $("#zombies").empty();
  if (ids === null || ids === undefined) {
    return;
  }
  for (id of Object.keys(ids)) {
    getZombieDetails(id).then(function (zombie) {
      var date = new Date(zombie[3] * 1000);
      $("#zombies").append(`<div class="zombie">
          <ul>
            <li>Name: ${zombie[0]}</li>
            <li>DNA: ${zombie[1]}</li>
            <li>Level: ${zombie[2]}</li>
            <li>Wins: ${zombie[4]}</li>
            <li>Losses: ${zombie[5]}</li>
            <li>Ready Time: ${date}</li>
          </ul>
        </div>`);
    });
  }
}

async function createRandomZombie() {
  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");
  // Send the tx to our contract:
  var name = $("#name").val();
  const instance = await cryptoZombies.deployed();
  console.log(name);
  const { logs } = await instance.createRandomZombie(name, { from: userAccount });
  if (logs[0].event === "NewZombie") {
    $("#txStatus").text("Successfully created " + name + "!");
    // Transaction was accepted into the blockchain, let's redraw the UI
    getZombiesByOwner(userAccount).then(displayZombies);
  }
}

async function levelUp() {
  $("#txStatus").text("Leveling up your zombie...");
  var zombieId = $("#zombie-id").val();
  const instance = await cryptoZombies.deployed();
  const fee = "1000000000000000"; // 0.001 ether
  instance.levelUp(zombieId, { from: userAccount, value: fee }).then(function () {
    $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
    getZombiesByOwner(userAccount).then(displayZombies);
  });
}

async function getZombiesByOwner(owner) {
  const instance = await cryptoZombies.deployed();
  console.log(owner);
  const result = await instance.getZombiesByOwner(owner);
  return result;
}

async function getZombieDetails(id) {
  const instance = await cryptoZombies.deployed();
  const result = await instance.zombies(id);
  console.log(result);
  return result;
}

async function zombieToOwner(id) {
  const instance = await cryptoZombies.deployed();
  const result = await instance.zombieToOwner(id);
  return result;
}

$(function () {
  $(window).on("load", function () {
    init();
  });
});
