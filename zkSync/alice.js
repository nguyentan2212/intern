(async () => {
  require("dotenv").config();
  const ethers = require("ethers");
  const zksync = require("zksync");
  const utils = require("./utils");
  const token = "ETH";
  const amountToDeposit = "0.05";
  const amountToTransfer = "0.02";
  const amountToWithdraw = "0.002";

  const zkSyncProvider = await utils.getZkSyncProvider(zksync, process.env.NETWORK_NAME);
  const ethersProvider = await utils.getEthereumProvider(ethers, process.env.NETWORK_NAME);
  console.log("Creating a new Ropsten wallet for Alice");
  const aliceRopstenWallet = new ethers.Wallet(process.env.ALICE_PRIVATE_KEY, ethersProvider); // Account #78
  console.log(`Alice's Ropsten address is: ${aliceRopstenWallet.address}`);
  const aliceInitialRopstenBalance = await aliceRopstenWallet.getBalance();
  console.log(`Alice's initial balance on Ropsten is: ${ethers.utils.formatEther(aliceInitialRopstenBalance)}`);

  console.log("Creating a zkSync wallet for Alice");
  const aliceZkSyncWallet = await utils.initAccount(aliceRopstenWallet, zkSyncProvider, zksync);

  console.log("Depositing");
  await utils.depositToZkSync(aliceZkSyncWallet, token, amountToDeposit, ethers);
  await utils.displayZkSyncBalance(aliceZkSyncWallet, ethers);
  await utils.registerAccount(aliceZkSyncWallet);

  const transferFee = await utils.getFee("Transfer", aliceRinkebyWallet.address, token, zkSyncProvider, ethers);
  await utils.transfer(aliceZkSyncWallet, process.env.BOB_ADDRESS, amountToTransfer, transferFee, token, zksync, ethers);

  const withdrawalFee = await utils.getFee("Withdraw", aliceRinkebyWallet.address, token, zkSyncProvider, ethers);
  await utils.withdrawToEthereum(aliceZkSyncWallet, amountToWithdraw, withdrawalFee, token, zksync, ethers);
})();
