import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import CategoryTable from "./CategoryTable";

const CategoryList = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("category.categoryList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <CategoryTable />
      </Container>
    </>
  );
};
export default CategoryList;
