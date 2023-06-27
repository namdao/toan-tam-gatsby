import React from "react";
import { Container } from "@mui/material";
import { useLocales } from "locales";
import Header from "./BlockHeader";
import Helmet from "react-helmet";
import OrderNewEditForm from "scenes/orders/components/OrderNewEditForm";

const OrderCreate = () => {
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("orders.orderProcessing.title")} />
      <Container maxWidth={"lg"} sx={{ marginLeft: 0 }}>
        <Header />
        <OrderNewEditForm />
      </Container>
    </>
  );
};
export default OrderCreate;
