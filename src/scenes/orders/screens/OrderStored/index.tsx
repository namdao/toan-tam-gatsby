import React from "react";
import { Container, Divider } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import OrderList from "./OrderList";
import Helmet from "react-helmet";

const OrderProcessing = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("orders.orderStore.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <OrderList />
        <Divider />
      </Container>
    </>
  );
};
export default OrderProcessing;
