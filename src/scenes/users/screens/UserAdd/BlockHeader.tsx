import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={translate("users.userAdd.title")}
      links={[
        {
          name: translate("basicInfo.title"),
        },
        {
          name: translate("users.userList.title"),
          href: PATH_APP.user.list,
        },
        {
          name: translate("users.userAdd.title"),
        },
      ]}
    />
  );
};
export default Header;
