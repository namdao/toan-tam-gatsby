import React, { FC } from "react";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import { isBrowser, navigateByRole } from "utils/utility";
import appConstant from "constant/appConstant";

const { ROLES } = appConstant;

type GuestGuardProps = {
  component: React.ElementType;
  path: string;
};

const GuestGuard: FC<GuestGuardProps> = ({ component: Component, ...rest }) => {
  const token = useAppSelector(AuthSelector.getToken);
  const roles = useAppSelector(AuthSelector.getRolesUser);
  if (token !== "" && isBrowser) {
    navigateByRole(roles[0].name);
    return null;
  }

  return <Component {...rest} />;
};
export default GuestGuard;
