import React, { ChangeEvent, SyntheticEvent } from "react";
import {
  Stack,
  InputAdornment,
  TextField,
  MenuItem,
  Button,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";
import { customerSelector } from "scenes/customer/redux/slice";
import { ISelectCustomer } from "../OrderNeedCheck/BlockFilter";

const DATE_PICKER_WIDTH = 200;

const BlockFilter = () => {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector(OrdersSelector.getFilterOrder);
  const customerList = useAppSelector(customerSelector.getCustomerList);
  const onSetCreatedDate = (e: Date | null) => {
    dispatch(ordersAction.setDataFilter({ createDate: e }));
  };
  const onSetUpdatedDate = (e: Date | null) => {
    dispatch(ordersAction.setDataFilter({ updateDate: e }));
  };
  const onCustomerChange = (
    _e: SyntheticEvent<any>,
    value: ISelectCustomer | null
  ) => {
    dispatch(ordersAction.setDataFilter({ customer_id: value?.id }));
  };

  const onResetFilter = () => {
    dispatch(ordersAction.resetFilter());
  };

  const onClearCreatedDate = () => {
    dispatch(ordersAction.clearCreateDateFilter());
  };

  const onClearUpdatedDate = () => {
    dispatch(ordersAction.clearUpdateDateFilter());
  };

  const customerAutoComplete = customerList.map((e) => {
    return { id: e.id, label: `${e.name} (${e.company?.company_name})` };
  });
  const { createDate, updateDate, customer_id } = dataFilter || {};
  const customer = customerAutoComplete.find((e) => e.id === customer_id);
  const isFiltered = createDate || updateDate;
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: "column",
        md: "row",
      }}
    >
      <Autocomplete
        disablePortal
        autoHighlight
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={onCustomerChange}
        value={customer}
        options={customerAutoComplete}
        sx={{ width: 250 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderNeedCollect.filterCustomer")}
          />
        )}
      />
      <DatePicker
        label={translate("orders.createdDate")}
        value={createDate}
        onChange={onSetCreatedDate}
        inputFormat="dd / MM / yyyy"
        renderInput={({ InputProps, ...rest }) => {
          return (
            <TextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <>
                    {createDate && (
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
        value={updateDate}
        onChange={onSetUpdatedDate}
        inputFormat="dd / MM / yyyy"
        renderInput={({ InputProps, ...rest }) => {
          return (
            <TextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <>
                    {updateDate && (
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
};
export default React.memo(BlockFilter);
