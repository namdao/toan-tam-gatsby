import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Stack,
  InputAdornment,
  TextField,
  MenuItem,
  Box,
  TextFieldProps,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";
import {
  initParams,
  ORDER_FILTER,
  ORDER_STATUS_NAME,
  SEARCH_BY,
} from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import { IReqParams } from "scenes/orders/redux/types";
import { format } from "date-fns";

const INPUT_WIDTH = 160;
const DATE_PICKER_WIDTH = 200;

type Props = {
  status: ORDER_STATUS_NAME;
};
export default function BlockFilter({ status }: Props) {
  const { translate } = useLocales();
  const { onOrderWithStatus } = useOrderAllStatus(status);
  const [filterType, setFilterType] = useState<SEARCH_BY>(SEARCH_BY.ALL);
  const [filterCreatedDate, setFilterCreatedDate] = useState<Date | null>();
  const [filterUpdatedDate, setFilterUpdatedDate] = useState<Date | null>();
  const [filterName, setFilterName] = useState<string>("");
  const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterType(e.target.value as SEARCH_BY);
  };

  const onSetFilterName = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };
  useEffect(() => {
    const dataRequestOrder: IReqParams = {
      ...initParams,
    };
    if (filterCreatedDate) {
      dataRequestOrder.created_date = format(filterCreatedDate, "yyyy/MM/dd");
    }
    if (filterUpdatedDate) {
      dataRequestOrder.updated_date = format(filterUpdatedDate, "yyyy/MM/dd");
    }
    if (filterName) {
      dataRequestOrder.search = filterName.trim();
    }
    if (filterType) {
      dataRequestOrder.search_by = filterType;
    }
    onOrderWithStatus(dataRequestOrder);
  }, [filterType, filterCreatedDate, filterUpdatedDate, filterName]);

  const onResetFilter = () => {
    setFilterCreatedDate(null);
    setFilterUpdatedDate(null);
    setFilterName("");
    setFilterType(SEARCH_BY.ALL);
  };

  const onClearStartDate = () => {
    setFilterCreatedDate(null);
  };
  const onClearUpdatedDate = () => {
    setFilterUpdatedDate(null);
  };

  const isFiltered = filterCreatedDate || filterUpdatedDate || filterName;

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
        value={filterType}
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
        onChange={setFilterCreatedDate}
        inputFormat="dd / MM / yyyy"
        value={filterCreatedDate}
        renderInput={({ InputProps, ...rest }) => {
          return (
            <TextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <>
                    {filterCreatedDate && (
                      <Iconify
                        sx={{ cursor: "pointer" }}
                        onClick={onClearStartDate}
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
        value={filterUpdatedDate}
        onChange={setFilterUpdatedDate}
        inputFormat="dd / MM / yyyy"
        renderInput={({ InputProps, ...rest }) => {
          return (
            <TextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <>
                    {filterCreatedDate && (
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

      <TextField
        fullWidth
        value={filterName}
        onChange={onSetFilterName}
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
}
