import React, { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "components/iconify";
import FormProvider, { RHFTextField } from "components/hook-form";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import { IRequestLogin } from "scenes/auth/redux/types";
import useAuth from "scenes/auth/hooks/useAuth";

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { onSignIn } = useAuth();
  const token = useAppSelector(AuthSelector.getToken);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "namdao@gmail.com",
    password: "123456",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const callbackError = (message: string) => {
    reset();
    setError("afterSubmit", {
      message: message,
    });
  };

  const onSubmit = async (data: FormValuesProps) => {
    const payload: IRequestLogin = {
      identity: data.email,
      password: data.password,
      callbackError,
    };
    onSignIn(payload);
    // dispatch(authActions.setTokenSuccess("fdsfsfsdfds"));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        {/* <Link
          component="a"
          href={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
