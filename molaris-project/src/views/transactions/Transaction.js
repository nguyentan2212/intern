import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNativeTransactions } from "react-moralis";

function Transaction({ setTitle }) {
  const { getNativeTransations, data, isLoading } = useNativeTransactions();

  useEffect(() => {
    setTitle("Transactions");
    getNativeTransations({
      params: { address: "0x7e576E3FFdFf96581f035B29B2E084299b72900c" },
    });
  },[getNativeTransations, setTitle]);

  const load = async () => {
    await getNativeTransations({
      params: { address: "0x7e576E3FFdFf96581f035B29B2E084299b72900c" },
    });
    console.log(data);
  };

  const columns = [
    { field: "hash", headerName: "Hash", width: 200 },
    { field: "from_address", headerName: "From", width: 250 },
    { field: "to_address", headerName: "To", width: 250 },
    { field: "value", headerName: "Value", width: 150 },
    { field: "block_timestamp", headerName: "Time", width: 200 },
  ];

  return (
    <Box sx={{ padding: "10px", width: "100%", height: "100%" }}>
      <Button onClick={load}>Refresh</Button>
      {data && data.result && !isLoading && (
        <DataGrid
          rows={data.result}
          columns={columns}
          getRowId={(row) => row.hash}
        />
      )}
    </Box>
  );
}

export default Transaction;
