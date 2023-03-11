import React from "react";
import { Router } from "@reach/router";
import Login from "scenes/auth/screens/login";
import { PATH_AUTH } from "constant/routeConstant";
import GuestGuard from "manager/guardManager/GuestGuard";
import NotFoundPage from "./404";

const Auth = () => (
  <Router>
    <GuestGuard path={PATH_AUTH.login} component={Login} />
    {/* @ts-ignore */}
    <NotFoundPage default={true} />
  </Router>
);

export default Auth;
