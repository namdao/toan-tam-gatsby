import React from "react";
// @mui
import { Alert, Stack, Typography, Link } from "@mui/material";
// layouts
import LoginLayout from "layouts/loginLayout";
// routes
import { PATH_AUTH } from "constant/routeConstant";
//
import AuthLoginForm from "./AuthLoginForm";
import Helmet from "react-helmet";
import { useLocales } from "locales";

export default function Login() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet title="dang nhap" />
      <LoginLayout>
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4">{translate("auth.loginSystem")}</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{translate("auth.newUser")}</Typography>

            <Link component="a" href="#" variant="subtitle2">
              {translate("auth.contactAdmin")}
            </Link>
          </Stack>
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          Phiên bản : <strong>1.0.0</strong>
        </Alert>

        <AuthLoginForm />
      </LoginLayout>
    </>
  );
}
