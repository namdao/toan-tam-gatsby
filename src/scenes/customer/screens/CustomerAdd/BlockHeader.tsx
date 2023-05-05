import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={translate("customer.customerList.title")}
      links={[
        {
          name: translate("basicInfo.title"),
        },
        {
          name: translate("customer.customerList.title"),
          href: PATH_APP.customer.list,
        },
        {
          name: translate("customer.customerAdd.title"),
        },
      ]}
    />
  );
};
export default Header;
