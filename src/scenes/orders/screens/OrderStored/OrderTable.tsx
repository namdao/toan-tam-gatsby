import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridRowSelectionModel,
  GridPaginationModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import {
  OrderStoredTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderStoredTableColumns";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import { enqueueSnackbar } from "notistack";
import { useLocales } from "locales";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  status: ORDER_STATUS_NAME;
  callbackBtnPrint: ({
    isValid,
    listIds,
  }: {
    isValid: boolean;
    listIds?: GridRowSelectionModel;
  }) => void;
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  status,
  callbackBtnPrint,
}) => {
  const { onNextPage } = useOrderAllStatus(status);
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(OrdersSelector.getFilterOrder);
  const orders = useAppSelector((state) =>
    OrdersSelector.getListByStatus(state, status)
  );
  const totalRow = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, status)
  );

  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.STORED,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  const paginationModel = {
    page: filter.page ?? 0,
    pageSize: filter.pageSize ?? 20,
  };

  const setPagination = (model: GridPaginationModel) => {
    dispatch(ordersAction.setPagination({ data: model }));
    onNextPage(model.page, model.pageSize);
  };

  const isSameCustomer = (listIds: GridRowSelectionModel) => {
    const listCustomerId = orders
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
      callbackBtnPrint({ isValid: false });
    } else {
      callbackBtnPrint({ isValid: true, listIds });
    }
  };

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.STORED,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        checkboxSelection
        onRowSelectionModelChange={onRowSelect}
        rows={orders}
        rowCount={totalRow}
        columns={OrderStoredTableColumns}
        columnVisibilityModel={storedColumn}
        onColumnVisibilityModelChange={onChangeColumn}
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
