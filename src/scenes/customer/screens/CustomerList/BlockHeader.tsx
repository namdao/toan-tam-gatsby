import { Button, Typography } from "@mui/material";
import { navigate } from "@reach/router";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();
  const onNavigateCreateCustomer = () => navigate(PATH_APP.customer.add);
  return (
    <CustomBreadcrumbs
      heading={translate("customer.customerList.title")}
      links={[
        {
          name: translate("customer.customerList.title"),
        },
      ]}
      action={
        <Button
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onNavigateCreateCustomer}
        >
          <Typography>{translate("customer.customerAdd.title")}</Typography>
        </Button>
      }
    />
  );
};
export default Header;
