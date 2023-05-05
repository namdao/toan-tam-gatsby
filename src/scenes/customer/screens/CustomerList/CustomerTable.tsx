import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { CustomerColumn } from "scenes/customer/helper/CustomerColumn";
import { useAppSelector } from "store";
import { customerSelector } from "scenes/customer/redux/slice";
import { LinearProgress } from "@mui/material";
import { useCustomer } from "scenes/customer/hooks/useCustomer";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const CustomerTable = () => {
  const customerList = useAppSelector(customerSelector.getCustomerList);
  const loading = useAppSelector(customerSelector.getLoading);
  const totalRow = useAppSelector(customerSelector.getTotal);
  const { getCustomerList } = useCustomer();
  useEffect(() => {
    getCustomerList(customerList.length > 0);
  }, []);
  const pinOrderLeft = useMemo(
    () =>
      CustomerColumn.filter(
        (e) => e.field === "name" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={customerList}
        rowCount={totalRow}
        columns={CustomerColumn}
        disableRowSelectionOnClick
        pageSizeOptions={[50, 100, 150]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        initialState={{
          pinnedColumns: {
            left: pinOrderLeft,
          },
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
export default CustomerTable;
