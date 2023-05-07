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
import { Card } from "@mui/material";
import { OrderPrintingTableColumns } from "scenes/orders/helper/OrderPrintingTableColumns";
import { useOrderPrinting } from "scenes/orders/hooks/useOrderPrinting";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableRef = {
  refreshList: () => void;
};
export const magicTableRef = createRef<IMagicTableRef>();
const OrderTable: React.FC = () => {
  const { orderList, total, onNextPage, onOrderPrintingList, pageModel } =
    useOrderPrinting();
  const apiRef = useGridApiRef();

  useImperativeHandle(magicTableRef, () => ({
    refreshList: onOrderPrintingList,
  }));

  useEffect(() => {
    onOrderPrintingList();
  }, []);

  const paginationModel = pageModel;
  const pinOrderLeft = useMemo(
    () =>
      OrderPrintingTableColumns.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Card>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          apiRef={apiRef}
          rows={orderList}
          rowCount={total}
          columns={OrderPrintingTableColumns}
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
