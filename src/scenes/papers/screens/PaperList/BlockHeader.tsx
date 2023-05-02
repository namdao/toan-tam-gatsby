import CustomBreadcrumbs from "components/breadCumbs";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  return (
    <CustomBreadcrumbs
      heading={translate("paper.paperList.title")}
      links={[
        {
          name: translate("basicInfo.title"),
        },
        {
          name: translate("paper.paperList.title"),
        },
      ]}
    />
  );
};
export default Header;
