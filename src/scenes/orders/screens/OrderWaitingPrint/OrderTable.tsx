import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { OrderWaitingTableColumns } from "scenes/orders/helper/OrderWaitingTableColumns";
import { IOrderDetail } from "scenes/orders/redux/types";
import { IPage } from "scenes/orders/hooks/useOrderWaitingPrint";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  total: number;
  orderList: IOrderDetail[];
  onNextPage: (page: number, size: number) => void;
  pageModel: IPage;
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  total,
  orderList,
  onNextPage,
  pageModel,
}) => {
  const pinOrderLeft = useMemo(
    () =>
      OrderWaitingTableColumns.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );

  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={orderList}
        rowCount={total}
        columns={OrderWaitingTableColumns}
        disableRowSelectionOnClick
        initialState={{
          pinnedColumns: {
            left: pinOrderLeft,
          },
          pagination: { paginationModel: pageModel },
        }}
        pageSizeOptions={[20, 50, 100]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        pagination
        paginationModel={pageModel}
        paginationMode="server"
        onPaginationModelChange={setPagination}
      />
    </Box>
  );
};
export default OrderTable;
