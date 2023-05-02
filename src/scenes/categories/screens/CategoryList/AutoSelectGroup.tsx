import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useGridApiContext, GridRenderCellParams } from "@mui/x-data-grid-pro";
import React from "react";
import { IResCategory } from "scenes/categories/redux/types";

export type IGroupCategory = {
  label: string;
  id: number;
};
export default function AutoSelectGroup(
  props: GridRenderCellParams<IResCategory> & { groupSelect: IGroupCategory[] }
) {
  const { id, value, field, groupSelect } = props;
  const apiRef = useGridApiContext();

  const [valueAutoComplete, setValue] = React.useState<string | null>(
    value.category_name
  );
  console.log(props);
  const onSelectValue = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    console.log(newValue);
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };
  return (
    <Autocomplete
      value={valueAutoComplete}
      // @ts-ignore
      onChange={onSelectValue}
      selectOnFocus
      clearOnBlur
      options={groupSelect}
      sx={{ flex: 1 }}
      renderInput={(params) => <TextField {...params} label="Chọn gia công" />}
    />
  );
}
