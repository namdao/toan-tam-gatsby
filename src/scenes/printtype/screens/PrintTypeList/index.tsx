import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import PrintTypeTable from "./PrintTypeTable";

const PrintTypeList = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("printtype.printTypeList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <PrintTypeTable />
      </Container>
    </>
  );
};
export default PrintTypeList;
