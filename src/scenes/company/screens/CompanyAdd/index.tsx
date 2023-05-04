import React from "react";
import { Container, Divider } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import CompanyNewEditForm from "../../components/CompanyNewEditForm";
const CompanyAdd = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("users.userAdd.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <CompanyNewEditForm />
        <Divider />
      </Container>
    </>
  );
};
export default CompanyAdd;
