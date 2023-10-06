import React, { useEffect, useState } from "react";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import {
  OrderStoredTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderStoredTableColumns";
import { useAppSelector } from "store";
import { enqueueSnackbar } from "notistack";
import { useLocales } from "locales";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
import { IOrder } from "scenes/orders/redux/types";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  status: ORDER_STATUS_NAME;
  orders: IOrder[];
  idCus: number;
  callbackBtnPrint: ({
    isValid,
    listIds,
    idCus,
  }: {
    isValid: boolean;
    listIds?: GridRowSelectionModel;
    idCus: number;
  }) => void;
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  orders,
  idCus,
  callbackBtnPrint,
}) => {
  const { translate } = useLocales();
  const totalRow = orders?.length || 0;

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

  // const isSameCustomer = (listIds: GridRowSelectionModel) => {
  //   const listCustomerId = orders
  //     .filter((e) => listIds.includes(e.id))
  //     .map((f) => f.customer_id);
  //   const firstCustomer = listCustomerId[0];
  //   for (let i = 0; i < listCustomerId.length; i++) {
  //     const currentCustomer = listCustomerId[i];
  //     if (currentCustomer !== firstCustomer) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const onRowSelect = (listIds: GridRowSelectionModel) => {
    // if (isSameCustomer(listIds)) {
    //   enqueueSnackbar({
    //     message: translate(
    //       "orders.orderNeedCollect.error.notSupportMultiCustomer"
    //     ),
    //     variant: "error",
    //   });
    //   callbackBtnPrint({ isValid: false, idCus });
    // } else {
    if (listIds.length < 1) {
      callbackBtnPrint({ isValid: false, listIds, idCus });
    } else {
      callbackBtnPrint({ isValid: true, listIds, idCus });
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
    <DataGridPro
      autoHeight
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
      }}
      pageSizeOptions={[20, 50, 100]}
      components={{
        Row: MemoizedRow,
        ColumnHeaders: MemoizedColumnHeaders,
      }}
    />
  );
};
export default OrderTable;
