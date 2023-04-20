import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  const onNavigateCompanyAdd = () => navigate(PATH_APP.company.add);
  return (
    <CustomBreadcrumbs
      heading={translate("company.companyList.title")}
      links={[
        {
          name: translate("company.companyList.title"),
        },
      ]}
      action={
        <Button
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onNavigateCompanyAdd}
        >
          <Typography>{translate("company.companyAdd.title")}</Typography>
        </Button>
      }
    />
  );
};
export default Header;
