import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  return (
    <CustomBreadcrumbs
      heading={translate("orders.orderPrinted.title")}
      links={[
        {
          name: translate("order.title"),
          href: PATH_APP.order.root,
        },
        {
          name: translate("orders.orderPrinted.title"),
        },
      ]}
    />
  );
};
export default Header;
