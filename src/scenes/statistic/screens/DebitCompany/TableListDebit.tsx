import { Box, Card, CardHeader, Grid } from "@mui/material";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { useLocales } from "locales";
import React, { FC, useMemo } from "react";
import { DeibitCustomerColumn } from "scenes/statistic/helper/DeibitCustomerColumn";
import { ICustomerDebit } from "scenes/statistic/redux/type";

type Props = {
  listCustomerDebit: ICustomerDebit[];
};
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
const TableListDebit: FC<Props> = ({ listCustomerDebit }) => {
  const { translate } = useLocales();
  const pinOrderLeft = useMemo(
    () =>
      DeibitCustomerColumn.filter(
        (e) => e.field === "company_name" || e.field === "actions"
      ).map((e) => e.field),
    []
  );

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Card>
        <CardHeader title={translate("statistic.debitCompany.title")} />
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGridPro
            rows={listCustomerDebit}
            rowCount={listCustomerDebit.length}
            columns={DeibitCustomerColumn}
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
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            getRowId={(row) => row.company_id}
            pagination
          />
        </Box>
      </Card>
    </Grid>
  );
};
export default TableListDebit;
