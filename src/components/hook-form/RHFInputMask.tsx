import React from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";
import InputMask, { Props as PropsInputMask } from "react-input-mask";

// ----------------------------------------------------------------------

type Props = {
  inputMask: PropsInputMask;
  name: string;
  textFieldProps: TextFieldProps;
};

export default function RHFInputMask({
  name,
  inputMask,
  textFieldProps,
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputMask
          maskPlaceholder={inputMask.maskPlaceholder}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...inputMask}
        >
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error ? error?.message : textFieldProps.helperText}
            {...textFieldProps}
          />
        </InputMask>
      )}
    />
  );
}
