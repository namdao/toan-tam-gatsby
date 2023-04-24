import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { OutsourceColumn } from "scenes/outsources/helper/OutsourceColumn";
import { useOutSource } from "scenes/outsources/hooks/useOutSource";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const OutSourceListTable = () => {
  const { loading, outsourceList, onGetOutSourceList } = useOutSource();
  useEffect(() => {
    onGetOutSourceList();
  }, []);

  if (loading) {
  }
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={outsourceList}
        rowCount={outsourceList?.length || 20}
        columns={OutsourceColumn}
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
export default OutSourceListTable;
