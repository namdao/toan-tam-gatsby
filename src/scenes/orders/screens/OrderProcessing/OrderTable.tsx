import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import {
  OrderColumnTable,
  fieldStored,
  pinOrderLeft,
} from "scenes/orders/helper/OrderTableColumns";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
import { AuthSelector } from "scenes/auth/redux/slice";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
type IMagicTableRef = {
  refreshList: () => void;
};
type IPropsOrderTable = {
  status: ORDER_STATUS_NAME;
};
export const magicOrderProcessingRef = createRef<IMagicTableRef>();

const OrderTable: React.FC<IPropsOrderTable> = ({ status }) => {
  const { onNextPage, onOrderWithStatus } = useOrderAllStatus(status);
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  const filter = useAppSelector(OrdersSelector.getFilterOrder);
  const orders = useAppSelector((state) =>
    OrdersSelector.getListByStatus(state, status)
  );
  const totalRow = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, status)
  );
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useImperativeHandle(magicOrderProcessingRef, () => ({
    refreshList: onOrderWithStatus,
  }));
  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.PROCESSING,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  // if (Object.entries(storedColumn).length < 1) {
  //   return <></>;
  // }

  const paginationModel = {
    page: filter.page ?? 0,
    pageSize: filter.pageSize ?? 20,
  };
  const setPagination = (model: GridPaginationModel) => {
    dispatch(ordersAction.setPagination({ data: model }));
    onNextPage(model.page, model.pageSize);
  };

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.PROCESSING,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <DataGridPro
        rows={orders}
        rowCount={totalRow}
        columnVisibilityModel={storedColumn}
        columns={OrderColumnTable}
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
  );
};
export default OrderTable;
