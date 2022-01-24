# Eth Price Oracle

## Deploy contract (Ropsten)

1. [Lấy wallet mnemonic từ metamask](https://metamask.zendesk.com/hc/en-us/articles/360015290032)
2. Private key của một account [lấy từ metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) (dùng để deploy contract và chạy file oracle.js)
3. [Ether](https://faucet.metamask.io/) để trả phí
4. [Ropsten websocket](https://infura.io/docs/gettingStarted/chooseaNetwork) của [Infura](https://infura.io/)
5. File ".env" với định dạng như sau:

   ```bash
   MNEMONIC = <mnemonic>
   PRIVATE_KEY = <private key>
   INFURA_WEBSOCKET = <ropsten websocket của infura>
   LOCAL_WEBSOCKET = <websocket của ganache>
   DEVELOPMENT = false
   ```

6. Thực hiện các lệnh sau trong terminal để deploy lên mạng ropsten

   ```bash
   npm i
   truffle migrate ropsten
   ```

7. Mở terminal và chạy file oracle.js

   ```bash
   node server/oracle.js
   ```

8. Mở thêm 1 terminal nữa để chạy file client.js

   ```bash
   node server/client.js
   ```

## Deploy contract (Local - Ganache)

Thay các bước 5 và 6 ở trên bằng 2 bước sau

5. File ".env" với định dạng như sau:

   ```bash
   MNEMONIC = <mnemonic>
   PRIVATE_KEY = <private key>
   INFURA_WEBSOCKET = <ropsten websocket của infura>
   LOCAL_WEBSOCKET = <websocket của ganache>
   DEVELOPMENT = true
   ```

6. Thực hiện các lệnh sau trong terminal để deploy lên mạng local

   ```bash
   npm i
   truffle migrate development
   ```
