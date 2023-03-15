import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import BlockSummary from "./BlockSummary";

const OrderProcessing = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <head>
        <title>{translate("orders.orderProcessing.title")}</title>
      </head>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <BlockSummary />
      </Container>
    </>
  );
};
export default OrderProcessing;
