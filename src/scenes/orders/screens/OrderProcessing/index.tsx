import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import OrderList from "./OrderList";
import Helmet from "react-helmet";
import BtnCreateOrder from "./BtnCreateOrder";

const OrderProcessing = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("orders.orderProcessing.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        {/* <BlockSummary /> */}
        <BtnCreateOrder />
        <OrderList />
      </Container>
    </>
  );
};
export default OrderProcessing;
