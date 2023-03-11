import React from "react";
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// layouts
import LoginLayout from "layouts/loginLayout";
// routes
import { PATH_AUTH } from "constant/routeConstant";
//
import AuthLoginForm from "./AuthLoginForm";
import Helmet from "react-helmet";

export default function Login() {
  return (
    <>
      <Helmet title="dang nhap" />
      <LoginLayout>
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4">Sign in to Toàn Tâm</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">New user?</Typography>

            <Link component="a" href={PATH_AUTH.register} variant="subtitle2">
              Create an account
            </Link>
          </Stack>
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          Use email : <strong>demo@minimals.cc</strong> / password :
          <strong> demo1234</strong>
        </Alert>

        <AuthLoginForm />
      </LoginLayout>
    </>
  );
}
