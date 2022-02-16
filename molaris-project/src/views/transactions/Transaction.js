import React, { useEffect, useState } from "react";
import { Box, Tab, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel, LoadingButton } from "@mui/lab/";
import { useNativeTransactions, useERC20Transfers, useNFTTransfers } from "react-moralis";
import NativeTransaction from "./NativeTransaction";
import ERC20Transfer from "./ERC20Transfer";
import NFTTransfer from "./NFTTransfer";

function Transaction({ setTitle }) {
  const [value, setValue] = useState("0");
  const { getNativeTransations, data: nativeData, isFetching: nativeFetching } = useNativeTransactions();
  const { fetchERC20Transfers, data: ERC20Data, isFetching: ERC20Fetching } = useERC20Transfers();
  const { getNFTTransfers, data: NFTData, isFetching: NFTFetching } = useNFTTransfers();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setTitle("Transactions");
    getNativeTransations();
    fetchERC20Transfers();
    getNFTTransfers();
  }, [getNativeTransations, fetchERC20Transfers, getNFTTransfers, setTitle]);

  const fetchData = () => {
    if (userAddress) {
      getNativeTransations({ params: { address: userAddress } });
      fetchERC20Transfers({ params: { address: userAddress } });
      getNFTTransfers({ params: { address: userAddress } });
    } else {
      getNativeTransations();
      fetchERC20Transfers();
      getNFTTransfers();
    }
  };

  return (
    <Box sx={{ padding: "10px", width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <TextField
          sx={{ width: "300px" }}
          variant="outlined"
          size="small"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        ></TextField>
        <LoadingButton
          sx={{ marginLeft: "5px" }}
          loading={nativeFetching || ERC20Fetching || NFTFetching}
          onClick={fetchData}
          loadingIndicator="Loading..."
          variant="outlined"
        >
          Fetch data
        </LoadingButton>
      </Box>
      <TabContext value={value}>
        <Box sx={{ width: "100%" }}>
          <TabList onChange={(e, val) => setValue(val)} aria-label="transactions">
            <Tab label="Native" value="0" />
            <Tab label="ERC-20" value="1" />
            <Tab label="NFT" value="2" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <NativeTransaction data={nativeData} />
        </TabPanel>
        <TabPanel value="1">
          <ERC20Transfer data={ERC20Data} />
        </TabPanel>
        <TabPanel value="2">
          <NFTTransfer data={NFTData} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Transaction;
