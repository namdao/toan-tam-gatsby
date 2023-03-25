import React, { useEffect, useMemo } from "react";
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
    page: filter.page,
    pageSize: filter.pageSize,
  };
  const pinOrderLeft = useMemo(
    () => OrderColumnTable.find((e) => e.field === "order_no"),
    []
  );
  const pinOrderRight = useMemo(
    () => OrderColumnTable.find((e) => e.field === "action"),
    []
  );

  const setPagination = (model: GridPaginationModel) => {
    if (model.page === 0) {
      model.page = 1;
    }
    dispatch(ordersAction.setPagination({ data: model }));
  };
  useEffect(() => {
    onNextPage(filter.page ?? 1, filter.pageSize ?? 20);
  }, [filter.page, filter.pageSize, status]);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={orders}
        rowCount={totalRow}
        columns={OrderColumnTable}
        disableRowSelectionOnClick
        initialState={{
          pinnedColumns: {
            left: pinOrderLeft && [pinOrderLeft?.field],
            right: pinOrderRight && [pinOrderRight?.field],
          },
          pagination: { paginationModel },
        }}
        pageSizeOptions={[20, 50, 100]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        pagination
        paginationMode="server"
        onPaginationModelChange={setPagination}
      />
    </Box>
  );
};
export default OrderTable;
