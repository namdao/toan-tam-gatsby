import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { OrderCollectTableColumns } from "scenes/orders/helper/OrderCollectTableColumns";
import { useListOrderColect } from "scenes/orders/hooks/useOrderNeedCollect";
import BlockFilter from "./BlockFilter";
import { Button, Card } from "@mui/material";
import { useCustomer } from "scenes/customer/hooks/useCustomer";
import { Stack } from "@mui/system";
import BlockPrintAndSendEmail from "./BlockPrintAndSendEmail";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const OrderTable: React.FC = () => {
  const {
    onNextPage,
    loading,
    orderList,
    total,
    setDateCreated,
    setDateUpdated,
    createdDate,
    updatedDate,
    customer,
    pageModel,
    setCustomer,
    onOrderListCollect,
  } = useListOrderColect();
  const { getCustomerList } = useCustomer();
  useEffect(() => {
    getCustomerList();
  }, []);
  useEffect(() => {
    onOrderListCollect();
  }, [createdDate, updatedDate, customer]);
  const paginationModel = pageModel;
  const pinOrderLeft = useMemo(
    () =>
      OrderCollectTableColumns.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <BlockFilter
          setDateCreated={setDateCreated}
          setDateUpdated={setDateUpdated}
          createdDate={createdDate}
          updatedDate={updatedDate}
          setCustomer={setCustomer}
          customer={customer}
        />
        <BlockPrintAndSendEmail />
      </Stack>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          loading={loading}
          checkboxSelection
          rows={orderList}
          rowCount={total}
          columns={OrderCollectTableColumns}
          disableRowSelectionOnClick
          initialState={{
            pinnedColumns: {
              left: pinOrderLeft,
            },
            pagination: { paginationModel },
          }}
          pageSizeOptions={[20, 50, 100]}
          components={{
            Row: MemoizedRow,
            ColumnHeaders: MemoizedColumnHeaders,
          }}
          pagination
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPagination}
        />
      </Box>
    </Card>
  );
};
export default OrderTable;
