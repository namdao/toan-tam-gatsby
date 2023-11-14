import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridRowSelectionModel,
  GridPaginationModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import { Button, Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BlockPrintAndSendEmail, { IPropsPrint } from "./BlockPrintAndSendEmail";
import { useStatisticDebitCompany } from "scenes/statistic/hooks/useStatisticDebitCompany";
import {
  DeibitCompanyDetailColumn,
  fieldStored,
} from "scenes/statistic/helper/DebitCompanyDetailColumn";
import Counter from "components/animate/counter";
import { useLocales } from "locales";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";

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
  const currentUser = useAppSelector(AuthSelector.getProfile);
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
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  useLayoutEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.DEBIT_COMPAY_DETAIL,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

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
  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.DEBIT_COMPAY_DETAIL,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
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
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGridPro
          checkboxSelection
          rows={orderList}
          rowCount={total}
          columnVisibilityModel={storedColumn}
          columns={DeibitCompanyDetailColumn}
          onColumnVisibilityModelChange={onChangeColumn}
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
