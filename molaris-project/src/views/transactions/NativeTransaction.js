import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function NativeTransaction({data}) {
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { field: "hash", headerName: "Hash", width: 200 },
    { field: "from_address", headerName: "From", width: 250 },
    { field: "to_address", headerName: "To", width: 250 },
    { field: "value", headerName: "Value", width: 150 },
    { field: "gas", headerName: "Gas", width: 100 },
    { field: "block_timestamp", headerName: "Time", width: 200 },
  ];

  return (
    <>
      {data && (
        <DataGrid
          autoHeight
          rows={data.result}
          columns={columns}
          getRowId={(row) => row.hash}
          rowsPerPageOptions={[10, 20, 50]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      )}
    </>
  );
}

export default NativeTransaction;
