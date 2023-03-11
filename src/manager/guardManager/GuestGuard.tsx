import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import React, { FC, useEffect } from "react";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import { isBrowser } from "utils/utility";

type GuestGuardProps = {
  component: React.ElementType;
  path: string;
};

const GuestGuard: FC<GuestGuardProps> = ({ component: Component, ...rest }) => {
  const token = useAppSelector(AuthSelector.getToken);
  if (token !== "" && isBrowser) {
    navigate(PATH_APP.root);
    return null;
  }

  return <Component {...rest} />;
};
export default GuestGuard;
