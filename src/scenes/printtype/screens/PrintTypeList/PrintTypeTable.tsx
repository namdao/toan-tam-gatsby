import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { PrintTypeColumn } from "scenes/printtype/helper/PrintTypeColumn";
import { LinearProgress } from "@mui/material";
import { usePrintType } from "scenes/printtype/hooks/usePrintType";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const PrintTypeTable = () => {
  const { loading, listPrintType, onGetPrintTypes } = usePrintType();
  useEffect(() => {
    onGetPrintTypes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  const totalRow = listPrintType.length;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={listPrintType}
        rowCount={totalRow}
        columns={PrintTypeColumn}
        disableRowSelectionOnClick
        pageSizeOptions={[50, 100, 150]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pagination
      />
    </Box>
  );
};
export default PrintTypeTable;
