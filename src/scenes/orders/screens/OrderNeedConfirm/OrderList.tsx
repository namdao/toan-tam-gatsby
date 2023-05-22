import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
  GridColumnVisibilityModel,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { useListOrderConfirm } from "scenes/orders/hooks/useOrderNeedConfirm";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import {
  OrderNeedConfirmTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderNeedConfirmTableColumns";
import { IOrder, IOrderDetail } from "scenes/orders/redux/types";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";

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
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useImperativeHandle(magicTableRef, () => ({
    updateRowSuccess: rowUpdate,
  }));

  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.NEED_CONFIRM,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  useEffect(() => {
    onOrderListConfirm();
  }, [customer]);

  // if (Object.entries(storedColumn).length < 1) {
  //   return <></>;
  // }

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.NEED_CONFIRM,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };
  const rowUpdate = (row: IOrder | IOrderDetail) => {
    apiRef.current.updateRows([
      { id: row.id, confirmed_money: !row.confirmed_money },
    ]);
  };
  const paginationModel = pageModel;

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
          columnVisibilityModel={storedColumn}
          onColumnVisibilityModelChange={onChangeColumn}
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
