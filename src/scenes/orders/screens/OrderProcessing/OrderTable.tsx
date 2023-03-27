import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { OrderColumnTable } from "scenes/orders/helper/OrderTableColumns";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  status: ORDER_STATUS_NAME;
};
const OrderTable: React.FC<IPropsOrderTable> = ({ status }) => {
  const { onNextPage } = useOrderAllStatus(status);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(OrdersSelector.getFilterOrder);
  const orders = useAppSelector((state) =>
    OrdersSelector.getListByStatus(state, status)
  );
  const totalRow = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, status)
  );
  const paginationModel = {
    page: filter.page ?? 0,
    pageSize: filter.pageSize ?? 20,
  };
  const pinOrderLeft = useMemo(
    () =>
      OrderColumnTable.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    dispatch(ordersAction.setPagination({ data: model }));
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={orders}
        rowCount={totalRow}
        columns={OrderColumnTable}
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
  );
};
export default OrderTable;
