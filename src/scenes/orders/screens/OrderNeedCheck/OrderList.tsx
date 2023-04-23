import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { OrderNeedCheckTableColumns } from "scenes/orders/helper/OrderNeedCheckTableColumns";
import { useListOrderNeedCheck } from "scenes/orders/hooks/useOrderNeedCheck";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { Stack } from "@mui/system";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableNeedChecktRef = {
  onRefreshOrderList: () => void;
};
export const magicTableNeedCheckRef = createRef<IMagicTableNeedChecktRef>();

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
    onOrderListNeedCheck,
  } = useListOrderNeedCheck();

  useEffect(() => {
    onOrderListNeedCheck();
  }, [createdDate, updatedDate, customer]);

  useImperativeHandle(magicTableNeedCheckRef, () => ({
    onRefreshOrderList: onOrderListNeedCheck,
  }));
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
