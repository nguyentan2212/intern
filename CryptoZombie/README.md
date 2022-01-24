# CryptoZombieClone  

## Deploy contract (Ropsten)

1. [Lấy wallet mnemonic từ metamask](https://metamask.zendesk.com/hc/en-us/articles/360015290032)
2. [Ether](https://faucet.metamask.io/) để trả phí
3. [Ropsten API](https://infura.io/docs/gettingStarted/chooseaNetwork) của [Infura](https://infura.io/)
4. File ".env" với định dạng như sau:

   ```bash
   MNEMONIC = <mnemonic>
   API_KEY = <infura ropsten api>
   ```

5. Thực hiện các lệnh sau trong terminal để deploy lên mạng ropsten

   ```bash
   npm i
   truffle migrate ropsten
   ```

6. Mở file "client/index.html" để chạy app

## Deploy contract (Local - Ganache)

1. Mở [Ganache workspace](https://trufflesuite.com/docs/ganache/quickstart.html)
2. Thực hiện các lệnh sau trong terminal

   ```bash
   npm i
   truffle migrate development
   ```

3. Mở file "client/index.html" để chạy app