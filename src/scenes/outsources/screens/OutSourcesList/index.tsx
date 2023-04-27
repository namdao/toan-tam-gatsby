import React from "react";
import { Card, Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import OutSourceListTable from "./OutSourceListTable";

const OutSourceList = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("outsource.outsourceList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <Card>
          <OutSourceListTable />
        </Card>
      </Container>
    </>
  );
};
export default OutSourceList;
