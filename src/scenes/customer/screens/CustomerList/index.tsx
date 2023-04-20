import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import CustomerTable from "./CustomerTable";

const CustomerList = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("customer.customerList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <CustomerTable />
      </Container>
    </>
  );
};
export default CustomerList;
