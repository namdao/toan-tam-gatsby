import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { useRevenueCompanyDetail } from "scenes/statistic/hooks/useRevenueCompanyDetail";
import { RevenueCompanyDetailTableColumns } from "scenes/statistic/helper/RevenueCompanyDetailTableColumns";
import { Card } from "@mui/material";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

type IPropsOrderTable = {
  dateFrom: string;
  dateTo: string;
  companyId: number;
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  dateFrom,
  dateTo,
  companyId,
}) => {
  const { getRevenueByList, dataRevenue, total, pageModel, onNextPage } =
    useRevenueCompanyDetail(companyId);
  const pinOrderLeft = useMemo(
    () =>
      RevenueCompanyDetailTableColumns.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );

  useEffect(() => {
    getRevenueByList(dateFrom, dateTo);
  }, []);

  const setPagination = (model: GridPaginationModel) => {
    onNextPage(dateFrom, dateTo, model);
  };

  return (
    <Card>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          rows={dataRevenue}
          rowCount={total}
          columns={RevenueCompanyDetailTableColumns}
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
    </Card>
  );
};
export default OrderTable;
