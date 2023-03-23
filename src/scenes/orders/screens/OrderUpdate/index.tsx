import { Container } from "@mui/material";
import { useLocales } from "locales";
import React, { FC } from "react";
import Helmet from "react-helmet";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import BlockHeader from "./BlockHeader";

type IProps = {
  orderId: string;
};
const OrderUpdate: FC<IProps> = ({ orderId }) => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Helmet title={translate("orders.orderProcessing.update", { orderId })} />
      <BlockHeader orderId={orderId} />
    </Container>
  );
};
export default OrderUpdate;
