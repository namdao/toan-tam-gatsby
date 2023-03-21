import React, { useState } from "react";
import { Stack, InputAdornment, TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";
import { ORDER_FILTER } from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";

const INPUT_WIDTH = 160;
const DATE_PICKER_WIDTH = 200;

type Props = {
  filterName: string;
  isFiltered: boolean;
  filterService: string;
  optionsService: string[];
  filterEndDate: Date | null;
  onResetFilter: VoidFunction;
  filterStartDate: Date | null;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterService: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

const inputDate = (params) => {
  return (
    <TextField
      {...params}
      fullWidth
      sx={{
        maxWidth: { md: DATE_PICKER_WIDTH },
      }}
    />
  );
};
export default function BlockFilter() {
  const { translate } = useLocales();
  const [filterType, setFilterType] =
    useState<React.ChangeEvent<HTMLInputElement>>();
  const [filterStartDate, setFilterStartDate] = useState();
  const [filterEndDate, setFilterEndDate] = useState();
  const [filterName, setFilterName] = useState();
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
        select
        label={translate("orders.filterBy")}
        value={filterType}
        onChange={setFilterType}
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
        value={filterStartDate}
        onViewChange={(state) => console.log(state)}
        onChange={setFilterStartDate}
        slots={{ textField: inputDate }}
      />

      <DatePicker
        label={translate("orders.updatedDate")}
        value={filterEndDate}
        onChange={setFilterEndDate}
        slots={{ textField: inputDate }}
      />

      <TextField
        fullWidth
        value={filterName}
        onChange={setFilterName}
        placeholder={translate("orders.searchByPlaceHolder")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )} */}
    </Stack>
  );
}
