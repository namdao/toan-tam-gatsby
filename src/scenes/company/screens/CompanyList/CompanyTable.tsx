import React, { createRef, SyntheticEvent, useEffect, useImperativeHandle, useState } from "react";
import Box from "@mui/material/Box";
import { DataGridPro, GridRow, GridColumnHeaders } from "@mui/x-data-grid-pro";
import { CompanyColumn } from "scenes/company/helper/CompanyColumn";
import { Autocomplete, LinearProgress, TextField } from "@mui/material";
import { useCompany } from "scenes/company/hooks/useCompany";
import { useAppSelector } from "store";
import { companySelector } from "scenes/company/redux/slice";
import { ISelect } from "scenes/orders/screens/OrderSearch/BlockFilter";
import { useLocales } from "locales";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
export type IMagicTableRef = {
  onRefresh: () => Promise<void>;
};
export const magicTableRef = createRef<IMagicTableRef>();

const CompanyTable = () => {
  const { translate } = useLocales();
  const { loading, onGetCompanies } = useCompany();
  const listCompany = useAppSelector(companySelector.getCompanyList);
  const [selectCompany, setCompany] = useState<ISelect | null>(null);
  const controller = new AbortController();

  const companyAutoComplete = listCompany.map((e) => {
    return {
      id: e.id,
      label: `${e?.users?.[0]?.name} - (Công ty:${e.company_name}) - ${e.phone}`,
    };
  });
  useEffect(() => {
    onGetCompanies(controller.signal);
    return () => controller.abort();
  }, []);

  useImperativeHandle(magicTableRef, () => ({
    onRefresh: () => onGetCompanies(controller.signal),
  }));

  const onCompanyChange = (_e: SyntheticEvent<any>, value: ISelect | null) => {
    setCompany(value || null);
  };

  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  const totalRow = listCompany.length;

  const companyFilter = selectCompany
    ? listCompany.filter((e) => e.id === selectCompany?.id)
    : listCompany;

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={onCompanyChange}
        value={selectCompany}
        options={companyAutoComplete}
        sx={{ width: "30%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderNeedCollect.filterCustomer")}
          />
        )}
      />
      <DataGridPro
        rows={companyFilter}
        rowCount={totalRow}
        columns={CompanyColumn}
        disableRowSelectionOnClick
        pageSizeOptions={[100, 150, 250]}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pagination
      />
    </Box>
  );
};
export default CompanyTable;
