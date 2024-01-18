import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { CustomerColumn } from "scenes/customer/helper/CustomerColumn";
import { useAppSelector } from "store";
import { customerSelector } from "scenes/customer/redux/slice";
import { Autocomplete, LinearProgress, TextField } from "@mui/material";
import { useCustomer } from "scenes/customer/hooks/useCustomer";
import { ISelect } from "scenes/orders/screens/OrderSearch/BlockFilter";
import { useLocales } from "locales";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const CustomerTable = () => {
  const { translate } = useLocales();
  const customerList = useAppSelector(customerSelector.getCustomerList);
  const loading = useAppSelector(customerSelector.getLoading);
  const totalRow = useAppSelector(customerSelector.getTotal);
  const [customer, setCustomer] = useState<ISelect | null>(null);
  const customerAutoComplete = customerList.map((e) => {
    return {
      id: e.id,
      label: `${e.name} - (Công ty:${e.company?.company_name}) - ${e.phone}`,
    };
  });

  const onCustomerChange = (_e: SyntheticEvent<any>, value: ISelect | null) => {
    setCustomer(value || null);
  };
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

  const customerFilter = customer
    ? customerList.filter((e) => e.id === customer.id)
    : customerList;

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={onCustomerChange}
        value={customer}
        options={customerAutoComplete}
        sx={{ width: "30%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderNeedCollect.filterCustomer")}
          />
        )}
      />
      <DataGridPro
        rows={customerFilter}
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
