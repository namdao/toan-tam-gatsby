import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";

const Header = () => {
  const { translate } = useLocales();

  const onNavigatePrintypeAdd = () => navigate(PATH_APP.printType.add);
  return (
    <CustomBreadcrumbs
      heading={translate("printtype.printTypeList.title")}
      links={[
        {
          name: translate("printtype.printTypeList.title"),
        },
      ]}
      action={
        <Button
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={onNavigatePrintypeAdd}
        >
          <Typography>{translate("printtype.printTypeAdd.title")}</Typography>
        </Button>
      }
    />
  );
};
export default Header;
