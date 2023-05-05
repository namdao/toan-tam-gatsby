import React from "react";
import { Container, Divider } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import CustomerNewEditForm from "../../components/CustomerNewEditForm";
const CompanyAdd = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("users.userAdd.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <CustomerNewEditForm />
      </Container>
    </>
  );
};
export default CompanyAdd;
