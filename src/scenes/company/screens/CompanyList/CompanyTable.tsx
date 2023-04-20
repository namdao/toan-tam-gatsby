import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { CompanyColumn } from "scenes/company/helper/CompanyColumn";
import { LinearProgress } from "@mui/material";
import { useCompany } from "scenes/company/hooks/useCompany";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const CompanyTable = () => {
  const { loading, listCompany, onGetCompanies } = useCompany();
  const controller = new AbortController();
  useEffect(() => {
    onGetCompanies(controller.signal);
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  const totalRow = listCompany.length;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={listCompany}
        rowCount={totalRow}
        columns={CompanyColumn}
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
export default CompanyTable;
