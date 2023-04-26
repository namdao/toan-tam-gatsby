import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useGridApiContext, GridRenderCellParams } from "@mui/x-data-grid-pro";
import React from "react";

const filter = createFilterOptions<string>();

export default function AutoSelectGroup(
  props: GridRenderCellParams & { groupSelect: string[] }
) {
  const { id, value, field, groupSelect } = props;
  const apiRef = useGridApiContext();

  const dataMerge = [...new Set([value, ...groupSelect])];
  const [valueAutoComplete, setValue] = React.useState<string | null>(value);
  const [group, setGroup] = React.useState<string[]>(dataMerge);

  const onSelectValue = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (newValue) {
      const valSelect = newValue.replace("Thêm ", "");
      setValue(valSelect);
      setGroup((_prev) => [...groupSelect, valSelect]);
      apiRef.current.setEditCellValue({ id, field, value: valSelect });
    }
  };
  return (
    <Autocomplete
      value={valueAutoComplete}
      // @ts-ignore
      onChange={onSelectValue}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.includes(inputValue);
        if (inputValue !== "" && !isExisting) {
          filtered.push(`Thêm ${inputValue}`);
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      options={group}
      freeSolo
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ flex: 1 }}
      renderInput={(params) => (
        <TextField {...params} label="Chọn hoặc thêm mới" />
      )}
    />
  );
}
