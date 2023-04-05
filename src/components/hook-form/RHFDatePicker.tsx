import React from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Iconify from "components/iconify";

type Props = TextFieldProps & {
  name: string;
};
export default function RHFDatePicker({
  name,
  label,
  helperText,
  ...others
}: Props) {
  const { control, setValue } = useFormContext();
  const onClearDate = () => {
    setValue(`${name}`, null);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={label}
          inputFormat="dd / MM / yyyy"
          renderInput={({ InputProps, ...rest }) => {
            return (
              <TextField
                {...rest}
                {...others}
                error={!!error}
                helperText={error ? error?.message : helperText}
                InputProps={{
                  endAdornment: (
                    <>
                      {field.value && (
                        <Iconify
                          sx={{ cursor: "pointer" }}
                          onClick={onClearDate}
                          icon="material-symbols:close"
                        />
                      )}
                      {InputProps?.endAdornment}
                    </>
                  ),
                }}
              />
            );
          }}
        />
      )}
    />
  );
}
