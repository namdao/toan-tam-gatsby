import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={translate("company.companyAdd.title")}
      links={[
        {
          name: translate("basicInfo.title"),
        },
        {
          name: translate("company.companyList.title"),
          href: PATH_APP.user.list,
        },
        {
          name: translate("company.companyAdd.title"),
        },
      ]}
    />
  );
};
export default Header;
