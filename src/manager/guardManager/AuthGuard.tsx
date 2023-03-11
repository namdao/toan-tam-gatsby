import React from "react";
import { PATH_AUTH } from "constant/routeConstant";
import { navigate } from "gatsby";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import { isBrowser } from "utils/utility";
import { Box } from "@mui/material";

type AuthGuardProps = {
  component: React.ElementType;
  path?: string;
  children?: React.ReactNode;
  title?: string;
};
const AuthGuard = ({
  component: Component,
  children,
  ...rest
}: AuthGuardProps): JSX.Element => {
  const token = useAppSelector(AuthSelector.getToken);
  if (token === "" || !isBrowser) {
    navigate(PATH_AUTH.login);
    return <></>;
  }
  if (children) {
    return <Box>{children}</Box>;
  }
  return <Component {...rest} />;
};

export default AuthGuard;
