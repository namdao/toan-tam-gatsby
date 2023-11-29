import React, {
  createRef,
  useCallback,
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
  DataGridProProps,
} from "@mui/x-data-grid-pro";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { useOrderSearch } from "scenes/orders/hooks/useOrderSearch";
import {
  OrderSearchColumnTable,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderSearchTableColumns";
import { IOrder } from "scenes/orders/redux/types";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";

export type IMagicTableRef = {
  refreshList: () => void;
};
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export const magicTableSearchRef = createRef<IMagicTableRef>();

const OrderTable: React.FC = () => {
  const {
    onNextPage,
    loading,
    orderList,
    total,
    setMethod,
    setOrderName,
    setPaperName,
    setOrderList,
    customer,
    method,
    paperName,
    orderName,
    pageModel,
    setCustomer,
    onSearchOrder,
    orderNo,
    setOrderNo,
  } = useOrderSearch();
  useEffect(() => {
    if (method || paperName?.id || orderName || customer?.id || orderNo) {
      onSearchOrder();
    } else if (orderList.length > 0) {
      setOrderList([]);
    }
  }, [method, paperName, orderName, customer, orderNo]);

  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.SEARCH,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  useImperativeHandle(magicTableSearchRef, () => ({
    refreshList: onSearchOrder,
  }));
  const paginationModel = pageModel;
  const getTreeDataPath: DataGridProProps["getTreeDataPath"] = useCallback(
    (row: IOrder & { group: string[] }) => row.group,
    []
  );

  const groupingColDef: DataGridProProps["groupingColDef"] = useMemo(() => {
    return {
      headerName: "Ngày tạo đơn",
      headerAlign: "center",
    };
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
      typeStored: OrderFeature.SEARCH,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };

  return (
    <Card>
      <BlockFilter
        setMethod={setMethod}
        setOrderName={setOrderName}
        setPaperName={setPaperName}
        setCustomer={setCustomer}
        setOrderNo={setOrderNo}
        method={method}
        paperName={paperName}
        orderName={orderName}
        customer={customer}
        orderNo={orderNo}
      />
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGridPro
          treeData
          loading={loading}
          rows={orderList}
          rowCount={total}
          columns={OrderSearchColumnTable}
          columnVisibilityModel={storedColumn}
          onColumnVisibilityModelChange={onChangeColumn}
          disableRowSelectionOnClick
          initialState={{
            pinnedColumns: {
              left: pinOrderLeft,
            },
            pagination: { paginationModel },
          }}
          getTreeDataPath={getTreeDataPath}
          groupingColDef={groupingColDef}
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
