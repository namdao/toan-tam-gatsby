import React from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";
import { NumericFormat } from "react-number-format";

type Props = TextFieldProps;

export default function RHFNumberFormat({
  name = "",
  helperText,
  ...other
}: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          // @ts-ignore
          <NumericFormat
            thousandSeparator=","
            customInput={TextField}
            {...field}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
