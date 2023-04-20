import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  const onNavigateCategoryAdd = () => navigate(PATH_APP.categories.add);
  return (
    <CustomBreadcrumbs
      heading={translate("category.categoryList.title")}
      links={[
        {
          name: translate("category.categoryList.title"),
        },
      ]}
      action={
        <Button
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onNavigateCategoryAdd}
        >
          <Typography>{translate("category.categoryAdd.title")}</Typography>
        </Button>
      }
    />
  );
};
export default Header;
