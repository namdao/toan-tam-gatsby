import React from "react";
import { Container } from "@mui/material";
import Helmet from "react-helmet";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "../OrderWaitingPrint/BlockHeader";
import OrderList from "../OrderWaitingPrint/OrderList";

const OrderWaitingPrintOffset = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();

  return (
    <>
      <Helmet title={translate("orders.orderWaitingPrintList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <OrderList printTypeName="offset" />
      </Container>
    </>
  );
};

export default OrderWaitingPrintOffset;
