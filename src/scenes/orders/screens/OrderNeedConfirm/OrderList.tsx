import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { useListOrderConfirm } from "scenes/orders/hooks/useOrderNeedConfirm";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { OrderNeedConfirmTableColumns } from "scenes/orders/helper/OrderNeedConfirmTableColumns";
import { IOrder, IOrderDetail } from "scenes/orders/redux/types";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableRef = {
  updateRowSuccess: (row: IOrder | IOrderDetail) => void;
};
export const magicTableRef = createRef<IMagicTableRef>();
const OrderTable: React.FC = () => {
  const {
    onNextPage,
    loading,
    orderList,
    total,
    customer,
    pageModel,
    setCustomer,
    onOrderListConfirm,
  } = useListOrderConfirm();
  const apiRef = useGridApiRef();

  useImperativeHandle(magicTableRef, () => ({
    updateRowSuccess: rowUpdate,
  }));

  useEffect(() => {
    onOrderListConfirm();
  }, [customer]);

  const rowUpdate = (row: IOrder | IOrderDetail) => {
    apiRef.current.updateRows([
      { id: row.id, confirmed_money: !row.confirmed_money },
    ]);
  };
  const paginationModel = pageModel;
  const pinOrderLeft = useMemo(
    () =>
      OrderNeedConfirmTableColumns.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Card>
      <BlockFilter setCustomer={setCustomer} customer={customer} />
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          apiRef={apiRef}
          loading={loading}
          rows={orderList}
          rowCount={total}
          columns={OrderNeedConfirmTableColumns}
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
