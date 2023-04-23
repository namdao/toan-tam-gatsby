import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { LinearProgress } from "@mui/material";
import { useCategory } from "scenes/categories/hooks/useCategory";
import { CategoryColumn } from "scenes/categories/helper/CategoryColumn";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const CategoryTable = () => {
  const { loading, listCategory, onGetCategory } = useCategory();
  useEffect(() => {
    onGetCategory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  const totalRow = listCategory?.length || 0;
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        treeData
        getTreeDataPath={(row) => row.group}
        rows={listCategory}
        rowCount={totalRow}
        columns={CategoryColumn}
        disableRowSelectionOnClick
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        groupingColDef={{
          headerName: "Danh mục cha",
        }}
        pagination
      />
    </Box>
  );
};
export default CategoryTable;
