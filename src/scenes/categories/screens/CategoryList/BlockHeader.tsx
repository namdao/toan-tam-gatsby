import { Button, Typography } from "@mui/material";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";
import React from "react";
import DialogAddCategory, { magicDialogCatRef } from "./DialogAddCategory";

const Header = () => {
  const { translate } = useLocales();

  const onNavigateCategoryAdd = () => magicDialogCatRef.current?.onOpen();
  return (
    <>
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
      <DialogAddCategory />
    </>
  );
};
export default Header;
