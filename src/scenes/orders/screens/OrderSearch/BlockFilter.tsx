import React, { ChangeEvent, SyntheticEvent } from "react";
import {
  Stack,
  TextField,
  Button,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";
import { useLocales } from "locales";
import { useAppSelector } from "store";
import { customerSelector } from "scenes/customer/redux/slice";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
export type ISelect = {
  id: number;
  label: string;
};
type IProps = {
  setCustomer: (val: ISelect | null) => void;
  setMethod: (val: string) => void;
  setOrderName: (val: string) => void;
  setPaperName: (val: ISelect | null) => void;
  customer: ISelect | null;
  method: string;
  paperName: ISelect | null;
  orderName: string;
};

export default function BlockFilter({
  customer,
  method,
  paperName,
  orderName,
  setCustomer,
  setMethod,
  setOrderName,
  setPaperName,
}: IProps) {
  const { translate } = useLocales();
  const customerList = useAppSelector(customerSelector.getCustomerList);
  const paperList = useAppSelector(PaperTypeSelector.getListPaper);
  const onResetFilter = () => {
    setCustomer(null);
    setPaperName(null);
    setOrderName("");
    setMethod("");
  };

  const onCustomerChange = (_e: SyntheticEvent<any>, value: ISelect | null) => {
    setCustomer(value || null);
  };
  const onPaperChange = (_e: SyntheticEvent<any>, value: ISelect | null) => {
    setPaperName(value || null);
  };

  const onSetOrderName = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderName(e.target.value);
  };

  const onSetMethod = (e: ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value);
  };
  const customerAutoComplete = customerList.map((e) => {
    return {
      id: e.id,
      label: `${e.name} - (Công ty:${e.company?.company_name}) - ${e.phone}`,
    };
  });

  const paperAutoComplete = paperList.map((e) => {
    return { id: e.id, label: e.paper_name };
  });
  const isFiltered = method || paperName || orderName || customer;
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={onCustomerChange}
        value={customer}
        options={customerAutoComplete}
        sx={{ width: "30%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderNeedCollect.filterCustomer")}
          />
        )}
      />
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={onPaperChange}
        value={paperName}
        options={paperAutoComplete}
        sx={{ width: "30%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderSearch.paper")}
          />
        )}
      />
      <TextField
        fullWidth
        sx={{ width: "30%" }}
        value={method}
        onChange={onSetMethod}
        placeholder={translate("orders.orderSearch.method")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        sx={{ width: "30%" }}
        value={orderName}
        onChange={onSetOrderName}
        placeholder={translate("orders.orderSearch.file")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon="ic:round-content-paste-search"
                sx={{ color: "text.disabled" }}
              />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {translate("orders.delete")}
        </Button>
      )}
    </Stack>
  );
}
