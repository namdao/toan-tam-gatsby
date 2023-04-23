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
  GridRowSelectionModel,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { OrderCollectTableColumns } from "scenes/orders/helper/OrderCollectTableColumns";
import { useListOrderColect } from "scenes/orders/hooks/useOrderNeedCollect";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { useCustomer } from "scenes/customer/hooks/useCustomer";
import { Stack } from "@mui/system";
import BlockPrintAndSendEmail, { IPropsPrint } from "./BlockPrintAndSendEmail";
import { useSnackbar } from "notistack";
import { useLocales } from "locales";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableNeedCollectRef = {
  onRefreshOrderList: () => void;
};
export const magicTableNeedCollectRef = createRef<IMagicTableNeedCollectRef>();
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
  const buttonRef = useRef<IPropsPrint>(null);
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    onOrderListCollect();
  }, [createdDate, updatedDate, customer]);

  useImperativeHandle(magicTableNeedCollectRef, () => ({
    onRefreshOrderList: onOrderListCollect,
  }));
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

  const isSameCustomer = (listIds: GridRowSelectionModel) => {
    const listCustomerId = orderList
      .filter((e) => listIds.includes(e.id))
      .map((f) => f.customer_id);
    const firstCustomer = listCustomerId[0];
    for (let i = 0; i < listCustomerId.length; i++) {
      const currentCustomer = listCustomerId[i];
      if (currentCustomer !== firstCustomer) {
        return true;
      }
    }
    return false;
  };

  const onRowSelect = (listIds: GridRowSelectionModel) => {
    if (isSameCustomer(listIds)) {
      enqueueSnackbar({
        message: translate(
          "orders.orderNeedCollect.error.notSupportMultiCustomer"
        ),
        variant: "error",
      });
      buttonRef?.current?.disablePrintPdf();
      buttonRef?.current?.disableSendEmail();
    } else {
      buttonRef?.current?.enablePrintPdf();
      buttonRef?.current?.enableSendEmail();
      buttonRef?.current?.setListIds(listIds as number[]);
    }
  };

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2.5, py: 3 }}
      >
        <BlockFilter
          setDateCreated={setDateCreated}
          setDateUpdated={setDateUpdated}
          createdDate={createdDate}
          updatedDate={updatedDate}
          setCustomer={setCustomer}
          customer={customer}
        />
        <BlockPrintAndSendEmail ref={buttonRef} />
      </Stack>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          loading={loading}
          checkboxSelection
          rows={orderList}
          rowCount={total}
          columns={OrderCollectTableColumns}
          onRowSelectionModelChange={onRowSelect}
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
