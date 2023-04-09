import React, { ChangeEvent } from "react";
import {
  Stack,
  InputAdornment,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";
import { ORDER_FILTER, SEARCH_BY } from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";

const INPUT_WIDTH = 160;
const DATE_PICKER_WIDTH = 200;

const BlockFilter = () => {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector(OrdersSelector.getFilterOrder);

  const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(ordersAction.setDataFilter({ type: e.target.value as SEARCH_BY }));
  };

  const onSetCreatedDate = (e: Date | null) => {
    dispatch(ordersAction.setDataFilter({ createDate: e }));
  };
  const onSetUpdatedDate = (e: Date | null) => {
    dispatch(ordersAction.setDataFilter({ updateDate: e }));
  };

  const onSetFilterSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(ordersAction.setDataFilter({ search: e.target.value }));
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

  const { createDate, updateDate, search, type } = dataFilter || {};
  const isFiltered = createDate || updateDate || search;

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
      <TextField
        fullWidth
        id="selected"
        select
        label={translate("orders.filterBy")}
        value={type}
        onChange={onChangeType}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: { maxHeight: 220 },
            },
          },
        }}
        sx={{
          maxWidth: INPUT_WIDTH,
          textTransform: "capitalize",
        }}
      >
        {ORDER_FILTER.map((option) => (
          <MenuItem
            defaultValue={option.value}
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
            }}
          >
            {translate(option.name)}
          </MenuItem>
        ))}
      </TextField>

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
                minWidth: DATE_PICKER_WIDTH,
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
                minWidth: DATE_PICKER_WIDTH,
              }}
            />
          );
        }}
      />

      <TextField
        fullWidth
        value={search}
        onChange={onSetFilterSearch}
        placeholder={translate("orders.searchByPlaceHolder")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
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
};

export default React.memo(BlockFilter);
