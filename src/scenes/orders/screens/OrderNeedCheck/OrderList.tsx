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
import {
  OrderNeedCheckTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderNeedCheckTableColumns";
import { useListOrderNeedCheck } from "scenes/orders/hooks/useOrderNeedCheck";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { Stack } from "@mui/system";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableNeedChecktRef = {
  onRefreshOrderList: () => void;
};
export const magicTableNeedCheckRef = createRef<IMagicTableNeedChecktRef>();

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
    onOrderListNeedCheck,
  } = useListOrderNeedCheck();
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.NEED_CHECK,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);
  useEffect(() => {
    onOrderListNeedCheck();
  }, [createdDate, updatedDate, customer]);

  useImperativeHandle(magicTableNeedCheckRef, () => ({
    onRefreshOrderList: onOrderListNeedCheck,
  }));

  // if (Object.entries(storedColumn).length < 1) {
  //   return <></>;
  // }

  const paginationModel = pageModel;

  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.NEED_CHECK,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };

  return (
    <Card>
      <Stack
        display="block"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <BlockFilter
          setDateCreated={setDateCreated}
          setDateUpdated={setDateUpdated}
          createdDate={createdDate}
          updatedDate={updatedDate}
          setCustomer={setCustomer}
          customer={customer}
        />
      </Stack>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGridPro
          loading={loading}
          rows={orderList}
          rowCount={total}
          columns={OrderNeedCheckTableColumns}
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
