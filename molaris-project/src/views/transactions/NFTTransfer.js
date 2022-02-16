import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function NFTTransfer({data}) {
    const [pageSize, setPageSize] = useState(10);
    const columns = [
        { field: "transaction_hash", headerName: "Hash", width: 260 },
        { field: "from_address", headerName: "From", width: 260 },
        { field: "to_address", headerName: "To", width: 260 },
        { field: "token_id", headerName: "Token id", width: 50 },
        { field: "token_address", headerName: "Token address", width: 260 },
        { field: "contract_type", headerName: "Type", width: 100 },
      ];
  return (
    <>
      {data && (
        <DataGrid
          autoHeight
          rows={data.result}
          columns={columns}
          getRowId={(row) => row.transaction_hash + row.token_id + row.token_address}
          rowsPerPageOptions={[10, 20, 50]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      )}
    </>
  )
}

export default NFTTransfer