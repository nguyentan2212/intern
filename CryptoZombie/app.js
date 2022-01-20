App = {
  web3Provider: null,
  web3: null,
  cryptoZombies: null,
  userAccount: null,

  init: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    App.web3 = new Web3(App.web3Provider);
    console.log("init app");
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("./contracts/ZombieOwnership.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      App.cryptoZombies = TruffleContract(data);

      // Set the provider for our contract
      App.cryptoZombies.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.initDisplay();
    });
    console.log("init contract");

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-create", App.createRandomZombie);
    $(document).on("click", ".btn-levelup", App.levelUp);
  },

  initDisplay: function () {
    setInterval(function () {
      // Check if account has changed
      if (App.web3.eth.accounts[0] !== App.userAccount) {
        App.userAccount = App.web3.eth.accounts[0];
        $("#userAccount").text(`User ${App.userAccount}`);
        // Call a function to update the UI with the new account
        App.getZombiesByOwner(App.userAccount).then(App.displayZombies);
      }
    }, 100);
  },

  displayZombies: function (ids) {
    $("#zombies").empty();
    if (ids === null || ids === undefined) {
      return;
    }
    for (id of Object.keys(ids)) {
      // Look up zombie details from our contract. Returns a `zombie` object
      App.getZombieDetails(id).then(function (zombie) {
        // Using ES6's "template literals" to inject variables into the HTML.
        // Append each one to our #zombies div
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
  },

  createRandomZombie: async function () {
    // This is going to take a while, so update the UI to let the user know
    // the transaction has been sent
    $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");
    // Send the tx to our contract:
    var name = $("#name").val();
    const instance = await App.cryptoZombies.deployed();
    console.log(name);
    const { logs } = await instance.createRandomZombie(name, { from: App.userAccount });
    if (logs[0].event === "NewZombie") {
      $("#txStatus").text("Successfully created " + name + "!");
      // Transaction was accepted into the blockchain, let's redraw the UI
      App.getZombiesByOwner(App.userAccount).then(App.displayZombies);
    }
  },

  levelUp: async function () {
    $("#txStatus").text("Leveling up your zombie...");
    var zombieId = $("#zombie-id").val();
    const instance = await App.cryptoZombies.deployed();
    const fee = "1000000000000000"; // 0.001 ether
    instance.levelUp(zombieId, { from: App.userAccount, value: fee }).then(function () {
      $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
      App.getZombiesByOwner(App.userAccount).then(App.displayZombies);
    });
  },

  getZombiesByOwner: async function (owner) {
    const instance = await App.cryptoZombies.deployed();
    console.log(owner);
    const result = await instance.getZombiesByOwner(owner);
    return result;
  },
  getZombieDetails: async function (id) {
    const instance = await App.cryptoZombies.deployed();
    const result = await instance.zombies(id);
    console.log(result);
    return result;
  },

  zombieToOwner: async function (id) {
    const instance = await App.cryptoZombies.deployed();
    const result = await instance.zombieToOwner(id);
    return result;
  }
};

$(function () {
  $(window).on("load", function () {
    App.init();
  });
});
