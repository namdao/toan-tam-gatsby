import React from "react";
import { Container, Divider } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import CompanyNewEditForm from "../../components/CompanyNewEditForm";
const CustomerAdd = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("company.companyAdd.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <CompanyNewEditForm />
      </Container>
    </>
  );
};
export default CustomerAdd;
