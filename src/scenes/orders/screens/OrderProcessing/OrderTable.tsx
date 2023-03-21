import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { OrderColumnTable } from "scenes/orders/helper/OrderTableColumns";
import { useAppSelector } from "store";
import { OrdersSelector } from "scenes/orders/redux/slice";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  status: ORDER_STATUS_NAME;
};
const OrderTable: React.FC<IPropsOrderTable> = ({ status }) => {
  const { onNextPage } = useOrderAllStatus(status);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 20,
  });
  const orders = useAppSelector((state) =>
    OrdersSelector.getListByStatus(state, status)
  );
  const totalRow = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, status)
  );
  const pinOrderLeft = useMemo(
    () => OrderColumnTable.find((e) => e.field === "order_no"),
    []
  );
  const pinOrderRight = useMemo(
    () => OrderColumnTable.find((e) => e.field === "action"),
    []
  );
  useEffect(() => {
    onNextPage(paginationModel.page + 1, paginationModel.pageSize);
  }, [paginationModel, status]);

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    editable: true,
  });
  console.log(data);
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
        onPaginationModelChange={setPaginationModel}
        // {...data}
      />
    </Box>
  );
};
export default OrderTable;
