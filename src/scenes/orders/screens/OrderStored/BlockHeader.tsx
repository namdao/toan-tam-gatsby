import React from "react";
import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";

const Header = () => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={translate("orders.orderStore.title")}
      links={[
        {
          name: translate("order.title"),
          href: PATH_APP.order.root,
        },
        {
          name: translate("orders.orderStore.title"),
        },
      ]}
    />
  );
};
export default Header;
