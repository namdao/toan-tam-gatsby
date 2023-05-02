import CustomBreadcrumbs from "components/breadCumbs";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  return (
    <CustomBreadcrumbs
      heading={translate("printtype.printTypeList.title")}
      links={[
        {
          name: translate("basicInfo.title"),
        },
        {
          name: translate("printtype.printTypeList.title"),
        },
      ]}
    />
  );
};
export default Header;
