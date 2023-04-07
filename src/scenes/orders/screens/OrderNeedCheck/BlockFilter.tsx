import React, { ChangeEvent, SyntheticEvent } from "react";
import { Stack, TextField, Button, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";
import { useLocales } from "locales";
import { useAppSelector } from "store";
import { customerSelector } from "scenes/customer/redux/slice";
const DATE_PICKER_WIDTH = 200;

type IProps = {
  createdDate: Date | null;
  updatedDate: Date | null;
  setDateUpdated: (val: Date | null) => void;
  setDateCreated: (val: Date | null) => void;
  setCustomer: (val: ISelectCustomer | null) => void;
  customer: ISelectCustomer | null;
};
export type ISelectCustomer = {
  id: number;
  label: string;
};
export default function BlockFilter({
  createdDate,
  updatedDate,
  customer,
  setDateUpdated,
  setDateCreated,
  setCustomer,
}: IProps) {
  const { translate } = useLocales();
  const customerList = useAppSelector(customerSelector.getCustomerList);
  const onSetCreatedDate = (e: Date | null) => {
    setDateCreated(e);
  };
  const onSetUpdatedDate = (e: Date | null) => {
    setDateUpdated(e);
  };

  const onResetFilter = () => {
    setDateCreated(null);
    setDateUpdated(null);
    setCustomer(null);
  };

  const onClearCreatedDate = () => {
    setDateCreated(null);
  };

  const onClearUpdatedDate = () => {
    setDateUpdated(null);
  };

  const onCustomerChange = (
    _e: SyntheticEvent<any>,
    value: ISelectCustomer | null
  ) => {
    setCustomer(value || null);
  };
  const customerAutoComplate = customerList.map((e) => {
    return { id: e.id, label: e.name };
  });
  const isFiltered = createdDate || updatedDate || customer;
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
        options={customerAutoComplate}
        sx={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderNeedCollect.filterCustomer")}
          />
        )}
      />
      <DatePicker
        label={translate("orders.createdDate")}
        value={createdDate}
        onChange={onSetCreatedDate}
        inputFormat="dd / MM / yyyy"
        renderInput={({ InputProps, ...rest }) => {
          return (
            <TextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <>
                    {createdDate && (
                      <Iconify
                        sx={{ cursor: "pointer" }}
                        onClick={onClearCreatedDate}
                        icon="material-symbols:close"
                      />
                    )}
                    {InputProps?.endAdornment}
                  </>
                ),
              }}
              sx={{
                minWidth: { md: DATE_PICKER_WIDTH },
              }}
            />
          );
        }}
      />
      <DatePicker
        label={translate("orders.updatedDate")}
        value={updatedDate}
        onChange={onSetUpdatedDate}
        inputFormat="dd / MM / yyyy"
        renderInput={({ InputProps, ...rest }) => {
          return (
            <TextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <>
                    {updatedDate && (
                      <Iconify
                        sx={{ cursor: "pointer" }}
                        onClick={onClearUpdatedDate}
                        icon="material-symbols:close"
                      />
                    )}
                    {InputProps?.endAdornment}
                  </>
                ),
              }}
              sx={{
                minWidth: { md: DATE_PICKER_WIDTH },
              }}
            />
          );
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
