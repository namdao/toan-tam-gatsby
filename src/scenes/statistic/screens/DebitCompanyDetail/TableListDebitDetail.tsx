import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridRowSelectionModel,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { Button, Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BlockPrintAndSendEmail, { IPropsPrint } from "./BlockPrintAndSendEmail";
import { useStatisticDebitCompany } from "scenes/statistic/hooks/useStatisticDebitCompany";
import { DeibitCompanyDetailColumn } from "scenes/statistic/helper/DebitCompanyDetailColumn";
import Counter from "components/animate/counter";
import { useLocales } from "locales";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableNeedCollectRef = {
  onRefreshOrderList: () => void;
};
export const magicTableNeedCollectRef = createRef<IMagicTableNeedCollectRef>();

const ButtonMoney = ({ money, title }: { money: number; title: string }) => (
  <Button variant="outlined" size="large">
    <Stack direction="column" sx={{ p: 1 }}>
      <Typography variant="caption">{title}</Typography>
      <Counter from={1} to={money} variant="h6" currency="VNĐ" />
    </Stack>
  </Button>
);

const TableListDebitDetail: React.FC<{
  companyId: number;
  totalDebit: number;
  totalPaid: number;
  delta: number;
}> = ({ companyId, totalDebit, totalPaid, delta }) => {
  const {
    onNextPage,
    orderList,
    total,
    pageModel,
    onGetOrdetListDebitByCompany,
  } = useStatisticDebitCompany(companyId);
  const buttonRef = useRef<IPropsPrint>(null);
  useEffect(() => {
    onGetOrdetListDebitByCompany();
  }, []);

  useImperativeHandle(magicTableNeedCollectRef, () => ({
    onRefreshOrderList: onGetOrdetListDebitByCompany,
  }));
  const paginationModel = pageModel;
  const pinOrderLeft = useMemo(
    () =>
      DeibitCompanyDetailColumn.filter(
        (e) => e.field === "order_no" || e.field === "actions"
      ).map((e) => e.field),
    []
  );
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  const onRowSelect = (listIds: GridRowSelectionModel) => {
    if (listIds.length > 0) {
      buttonRef?.current?.enablePrintPdf();
      buttonRef?.current?.enableSendEmail();
    } else {
      buttonRef?.current?.disablePrintPdf();
      buttonRef?.current?.disableSendEmail();
    }
    buttonRef?.current?.setListIds(listIds as number[]);
  };

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2.5, py: 3 }}
      >
        <BlockPrintAndSendEmail ref={buttonRef} />
        <Stack direction="row" spacing={2}>
          <ButtonMoney money={totalDebit} title="Tổng nợ" />
          <ButtonMoney money={totalPaid} title="Tổng thu" />
          <ButtonMoney money={delta} title="Còn lại" />
        </Stack>
      </Stack>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          checkboxSelection
          rows={orderList}
          rowCount={total}
          columns={DeibitCompanyDetailColumn}
          onRowSelectionModelChange={onRowSelect}
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
export default TableListDebitDetail;
