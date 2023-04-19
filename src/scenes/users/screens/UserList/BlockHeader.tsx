import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();
  const onNavigateCreateUser = () => navigate(PATH_APP.user.add);
  return (
    <CustomBreadcrumbs
      heading={translate("users.userList.title")}
      links={[
        {
          name: translate("users.userList.title"),
          href: PATH_APP.user.list,
        },
      ]}
      action={
        <Button
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onNavigateCreateUser}
        >
          <Typography>{translate("users.userAdd.title")}</Typography>
        </Button>
      }
    />
  );
};
export default Header;
