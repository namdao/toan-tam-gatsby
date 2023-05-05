import React, { createRef, useEffect, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { CompanyColumn } from "scenes/company/helper/CompanyColumn";
import { LinearProgress } from "@mui/material";
import { useCompany } from "scenes/company/hooks/useCompany";
import { useAppSelector } from "store";
import { companySelector } from "scenes/company/redux/slice";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableRef = {
  onRefresh: () => Promise<void>;
};
export const magicTableRef = createRef<IMagicTableRef>();

const CompanyTable = () => {
  const { loading, onGetCompanies } = useCompany();
  const listCompany = useAppSelector(companySelector.getCompanyList);
  const controller = new AbortController();
  useEffect(() => {
    onGetCompanies(controller.signal);
    return () => controller.abort();
  }, []);

  useImperativeHandle(magicTableRef, () => ({
    onRefresh: () => onGetCompanies(controller.signal),
  }));

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
        pageSizeOptions={[100, 150, 250]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pagination
      />
    </Box>
  );
};
export default CompanyTable;
