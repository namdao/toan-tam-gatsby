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
  useGridApiRef,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import { Card } from "@mui/material";
import {
  OrderPrintingTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderPrintingTableColumns";
import { useOrderPrinting } from "scenes/orders/hooks/useOrderPrinting";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  getTableColumn,
  OrderFeature,
  addTableColumn,
} from "services/firebase/common";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableRef = {
  refreshList: () => void;
};
export const magicTablePrintingRef = createRef<IMagicTableRef>();
const OrderTable: React.FC = () => {
  const { orderList, total, onNextPage, onOrderPrintingList, pageModel } =
    useOrderPrinting();

  const apiRef = useGridApiRef();
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useImperativeHandle(magicTablePrintingRef, () => ({
    refreshList: onOrderPrintingList,
  }));

  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.PRINTING,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  useEffect(() => {
    onOrderPrintingList();
  }, []);

  // if (Object.entries(storedColumn).length < 1) {
  //   return <></>;
  // }

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.PRINTING,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };

  const paginationModel = pageModel;

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
