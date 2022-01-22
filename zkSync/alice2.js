(async () => {
  require("dotenv").config();
  const ethers = require("ethers");
  const zksync = require("zksync");
  const utils = require("./utils");
  const token = "USDT";
  const amountToDeposit = "6.0";
  const amountToTransfer = "2.0";
  const amountToWithdraw = "2.0";

  const zkSyncProvider = await utils.getZkSyncProvider(zksync, process.env.NETWORK_NAME);
  const ethersProvider = await utils.getEthereumProvider(ethers, process.env.NETWORK_NAME);
  console.log("Creating a new Ropsten wallet for Alice");
  const aliceRopstenWallet = new ethers.Wallet(process.env.ALICE_PRIVATE_KEY, ethersProvider); // Account #78
  console.log(`Alice's Ropsten address is: ${aliceRopstenWallet.address}`);
  const aliceInitialRopstenBalance = await aliceRopstenWallet.getBalance();
  console.log(`Alice's initial balance on Ropsten is: ${ethers.utils.formatEther(aliceInitialRopstenBalance)}`);

  console.log("Creating a zkSync wallet for Alice");
  const aliceZkSyncWallet = await utils.initAccount(aliceRopstenWallet, zkSyncProvider, zksync);

  const tokenSet = zkSyncProvider.tokenSet;
  const aliceInitialRinkebyBalance = await aliceZkSyncWallet.getEthereumBalance(token);
  console.log(`Alice's initial balance on Rinkeby is: ${tokenSet.formatToken(token, aliceInitialRinkebyBalance)}`);

  await aliceZkSyncWallet.approveERC20TokenDeposits(token);

  console.log("Depositing");
  await utils.depositToZkSync(aliceZkSyncWallet, token, amountToDeposit, tokenSet);
  await utils.displayZkSyncBalance(aliceZkSyncWallet, tokenSet);
  await utils.registerAccount(aliceZkSyncWallet);

  const transferFee = await utils.getFee("Transfer", aliceRinkebyWallet.address, token, zkSyncProvider, tokenSet);
  await utils.transfer(aliceZkSyncWallet, process.env.BOB_ADDRESS, amountToTransfer, transferFee, token, zksync, tokenSet);

  const withdrawalFee = await utils.getFee("Withdraw", aliceRinkebyWallet.address, token, zkSyncProvider, tokenSet);
  await utils.withdrawToEthereum(aliceZkSyncWallet, amountToWithdraw, withdrawalFee, token, zksync, tokenSet);
})();
