import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  return (
    <CustomBreadcrumbs
      heading={translate("outsource.outsourceList.title")}
      links={[
        {
          name: translate("basicInfo.title"),
        },
        {
          name: translate("outsource.outsourceList.title"),
        },
      ]}
    />
  );
};
export default Header;
