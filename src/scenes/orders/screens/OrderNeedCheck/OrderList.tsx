import React, { useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { OrderNeedCheckTableColumns } from "scenes/orders/helper/OrderNeedCheckTableColumns";
import { useListOrderColect } from "scenes/orders/hooks/useOrderNeedCollect";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { Stack } from "@mui/system";

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

  useEffect(() => {
    onOrderListCollect();
  }, [createdDate, updatedDate, customer]);
  const paginationModel = pageModel;
  const pinOrderLeft = useMemo(
    () =>
      OrderNeedCheckTableColumns.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Card>
      <Stack
        display="block"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <BlockFilter
          setDateCreated={setDateCreated}
          setDateUpdated={setDateUpdated}
          createdDate={createdDate}
          updatedDate={updatedDate}
          setCustomer={setCustomer}
          customer={customer}
        />
      </Stack>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          loading={loading}
          rows={orderList}
          rowCount={total}
          columns={OrderNeedCheckTableColumns}
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
