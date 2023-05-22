import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import {
  OrderWaitingTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderWaitingTableColumns";
import { IOrderDetail } from "scenes/orders/redux/types";
import { IPage } from "scenes/orders/hooks/useOrderWaitingPrint";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  total: number;
  orderList: IOrderDetail[];
  onNextPage: (page: number, size: number) => void;
  pageModel: IPage;
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  total,
  orderList,
  onNextPage,
  pageModel,
}) => {
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.WAITING_PRINT,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.WAITING_PRINT,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        rows={orderList}
        rowCount={total}
        columns={OrderWaitingTableColumns}
        columnVisibilityModel={storedColumn}
        onColumnVisibilityModelChange={onChangeColumn}
        disableRowSelectionOnClick
        initialState={{
          pinnedColumns: {
            left: pinOrderLeft,
          },
          pagination: { paginationModel: pageModel },
        }}
        pageSizeOptions={[20, 50, 100]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        pagination
        paginationModel={pageModel}
        paginationMode="server"
        onPaginationModelChange={setPagination}
      />
    </Box>
  );
};
export default OrderTable;
