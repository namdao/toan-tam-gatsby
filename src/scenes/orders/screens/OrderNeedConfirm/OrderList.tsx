import React, {
  FC,
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
import { Card, Tab, Tabs } from "@mui/material";
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
import {
  IOrderTabNeedConfirm,
  ORDER_TAB_NEED_CONFIRM,
} from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import Label from "components/label";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableRef = {
  updateRowSuccess: (row: IOrder | IOrderDetail) => void;
};
export const magicTableRef = createRef<IMagicTableRef>();

type IPropsTab = {
  setMoneySource: (source: IOrderTabNeedConfirm) => void;
  moneySource: IOrderTabNeedConfirm;
};
const TabsSource: FC<IPropsTab> = ({ moneySource, setMoneySource }) => {
  const { translate } = useLocales();
  const { onOrderListConfirmByMoneySource, totalMoneySource } =
    useListOrderConfirm();
  useEffect(() => {
    ORDER_TAB_NEED_CONFIRM.forEach((e) => {
      onOrderListConfirmByMoneySource(e.value);
    });
  }, []);

  const onChangeStatus = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: IOrderTabNeedConfirm
  ) => {
    setMoneySource(newValue);
  };
  return (
    <Tabs
      value={moneySource}
      onChange={onChangeStatus}
      sx={{
        px: 2,
        bgcolor: "background.neutral",
      }}
    >
      {ORDER_TAB_NEED_CONFIRM.map((tab) => (
        <Tab
          key={tab.value}
          value={tab}
          label={translate(tab.name)}
          icon={
            <Label color="success" sx={{ mr: 1 }}>
              {totalMoneySource[tab.value]}
            </Label>
          }
        />
      ))}
    </Tabs>
  );
};

const OrderTable: React.FC = () => {
  const apiRef = useGridApiRef();
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});

  const {
    onNextPage,
    loading,
    orderList,
    totalMoneySource,
    customer,
    pageModel,
    setCustomer,
    onOrderListConfirm,
    setMoneySource,
    moneySource,
    setOrderList,
  } = useListOrderConfirm();
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
  }, [customer, moneySource]);

  // if (Object.entries(storedColumn).length < 1) {
  //   return <></>;
  // }

  const sortDeleteAndAddRow = (row: IOrder) => {
    const listNeedUpdate = orderList.filter((e) => e.id !== row.id);
    row.confirmed_money = !row.confirmed_money;
    listNeedUpdate.push(row);
    setOrderList(listNeedUpdate);
  };

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
    // apiRef.current.updateRows([
    //   { id: row.id, confirmed_money: !row.confirmed_money },
    // ]);
    sortDeleteAndAddRow(row as IOrder);
  };
  const paginationModel = pageModel;

  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Card>
      <TabsSource setMoneySource={setMoneySource} moneySource={moneySource} />
      <BlockFilter setCustomer={setCustomer} customer={customer} />
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGridPro
          apiRef={apiRef}
          loading={loading}
          rows={orderList}
          rowCount={totalMoneySource[moneySource.value]}
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
