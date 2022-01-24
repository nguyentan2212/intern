# zkSync

## Chuẩn bị

1. Private key của 2 account [lấy từ metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), một cho alice và một cho bob.
2. Lấy [Ether](https://faucet.metamask.io/) cho 2 account
3. File ".env" có định dạng sau:

   ```bash
   SLEEP_INTERVAL = 5000
   BOB_PRIVATE_KEY = <private key của bob>
   ALICE_PRIVATE_KEY = <private key của alice>
   NETWORK_NAME = rinkeby
   ```

4. Mở terminal và chạy file bob.js

   ```bash
   node bob.js
   ```

5. Mở thêm 1 terminal nữa để chạy file alice.js

   ```bash
   node alice.js
   ```
