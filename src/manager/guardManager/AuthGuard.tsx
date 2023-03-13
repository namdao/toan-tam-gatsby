import React from "react";
import { PATH_AUTH } from "constant/routeConstant";
import { navigate } from "gatsby";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import { isBrowser } from "utils/utility";
import { Box } from "@mui/material";
import Page403 from "pages/403";

type AuthGuardProps = {
  component: React.ElementType;
  path?: string;
  children?: React.ReactNode;
  roles: Array<string>;
};
const AuthGuard = ({
  component: Component,
  children,
  roles,
  ...rest
}: AuthGuardProps): JSX.Element => {
  const token = useAppSelector(AuthSelector.getToken);
  const rolesUser = useAppSelector(AuthSelector.getRolesUser);
  if (token === "" || !isBrowser) {
    navigate(PATH_AUTH.login);
    return <></>;
  }
  // Check permission roles user
  if (roles?.length > 0) {
    const isPermission = rolesUser
      .map((e) => e.name)
      .some((r) => roles.includes(r));
    if (!isPermission) {
      return <Page403 />;
    }
  }
  if (children) {
    return <Box>{children}</Box>;
  }
  return <Component {...rest} />;
};

export default AuthGuard;
