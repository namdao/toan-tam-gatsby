import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  const onNavigatePrintypeAdd = () => navigate(PATH_APP.outsource.add);
  return (
    <CustomBreadcrumbs
      heading={translate("outsource.outsourceList.title")}
      links={[
        {
          name: translate("outsource.outsourceList.title"),
        },
      ]}
      action={
        <Button
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onNavigatePrintypeAdd}
        >
          <Typography>{translate("outsource.outsourceAdd.title")}</Typography>
        </Button>
      }
    />
  );
};
export default Header;
