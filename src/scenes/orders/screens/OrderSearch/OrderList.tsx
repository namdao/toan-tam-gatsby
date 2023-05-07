import React, { useCallback, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
  DataGridProProps,
} from "@mui/x-data-grid-pro";
import BlockFilter from "./BlockFilter";
import { Card } from "@mui/material";
import { useOrderSearch } from "scenes/orders/hooks/useOrderSearch";
import { OrderSearchColumnTable } from "scenes/orders/helper/OrderSearchTableColumns";
import { IOrder } from "scenes/orders/redux/types";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

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
  } = useOrderSearch();
  useEffect(() => {
    if (method || paperName?.id || orderName || customer?.id) {
      onSearchOrder();
    } else if (orderList.length > 0) {
      setOrderList([]);
    }
  }, [method, paperName, orderName, customer]);
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

  const pinOrderLeft = useMemo(
    () =>
      OrderSearchColumnTable.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  return (
    <Card>
      <BlockFilter
        setMethod={setMethod}
        setOrderName={setOrderName}
        setPaperName={setPaperName}
        setCustomer={setCustomer}
        method={method}
        paperName={paperName}
        orderName={orderName}
        customer={customer}
      />
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          treeData
          loading={loading}
          rows={orderList}
          rowCount={total}
          columns={OrderSearchColumnTable}
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
