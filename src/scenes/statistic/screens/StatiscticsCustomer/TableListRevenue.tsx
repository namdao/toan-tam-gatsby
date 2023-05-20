import { Box, Card, CardHeader, Grid } from "@mui/material";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { useLocales } from "locales";
import React, {
  createRef,
  FC,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { RevenueCompanyColumn } from "scenes/statistic/helper/RevenueCompanyColumn";
import { useRevenueCompany } from "scenes/statistic/hooks/useRevenueCompany";
import { IReportRevenue } from "scenes/statistic/redux/type";
import { navigate } from "gatsby";
import { PATH_APP } from "constant/routeConstant";
import { format } from "date-fns";

type Props = {
  dateRange: Date[];
};
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

export type IMagicTableListRevenueRef = {
  onNavigateDetail: (row: IReportRevenue) => void;
};
export const magicTableListRevenueRef = createRef<IMagicTableListRevenueRef>();

const TableListRevenue: FC<Props> = ({ dateRange }) => {
  const { dataRevenue, getRevenueByList, pageModel, total, onNextPage } =
    useRevenueCompany();

  useEffect(() => {
    getRevenueByList(dateRange[0] || new Date(), dateRange[1] || new Date());
  }, [dateRange]);

  const onNavigateOrderCompanyDetail = useCallback(
    (row: IReportRevenue) => {
      const { company_id, company_name } = row;
      navigate(
        PATH_APP.statistic.customerRevenueDetail.replace(
          ":company_id",
          `${company_id.toString()}?company=${company_name}&dateFrom=${format(
            dateRange[0],
            "yyyy-MM-dd"
          )}&dateTo=${format(dateRange[1], "yyyy-MM-dd")}`
        )
      );
    },
    [dataRevenue]
  );

  useImperativeHandle(magicTableListRevenueRef, () => ({
    onNavigateDetail: onNavigateOrderCompanyDetail,
  }));
  const { translate } = useLocales();

  const pinOrderLeft = useMemo(
    () =>
      RevenueCompanyColumn.filter(
        (e) => e.field === "company_name" || e.field === "actions"
      ).map((e) => e.field),
    []
  );

  const onNext = (model: GridPaginationModel) => {
    onNextPage(dateRange[0] || new Date(), dateRange[1] || new Date(), model);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Card>
        <CardHeader title={translate("statistic.revenueCompany.title")} />
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGridPro
            rows={dataRevenue}
            rowCount={total}
            columns={RevenueCompanyColumn}
            disableRowSelectionOnClick
            pageSizeOptions={[20, 50, 100]}
            components={{
              Row: MemoizedRow,
              ColumnHeaders: MemoizedColumnHeaders,
            }}
            initialState={{
              pinnedColumns: {
                left: pinOrderLeft,
              },
              pagination: {
                paginationModel: pageModel,
              },
            }}
            getRowId={(row) => row.company_id}
            pagination
            paginationMode="server"
            onPaginationModelChange={onNext}
          />
        </Box>
      </Card>
    </Grid>
  );
};
export default TableListRevenue;
