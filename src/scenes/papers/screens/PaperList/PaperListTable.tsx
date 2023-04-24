import React from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { PaperTypeColumn } from "scenes/papers/helper/PaperColumn";
import { useAppSelector } from "store";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const PrintTypeTable = () => {
  const paperList = useAppSelector(PaperTypeSelector.getListPaper);

  const totalRow = paperList.length;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={paperList}
        rowCount={totalRow}
        columns={PaperTypeColumn}
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
