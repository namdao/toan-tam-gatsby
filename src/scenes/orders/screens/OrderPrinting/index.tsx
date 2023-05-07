import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import OrderList from "./OrderList";
import Helmet from "react-helmet";

const OrderPrinting = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("orders.orderPrintingList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <OrderList />
      </Container>
    </>
  );
};
export default OrderPrinting;
