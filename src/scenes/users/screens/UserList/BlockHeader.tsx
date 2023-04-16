import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={translate("users.userList.title")}
      links={[
        {
          name: translate("users.userList.title"),
          href: PATH_APP.user.list,
        },
      ]}
    />
  );
};
export default Header;
