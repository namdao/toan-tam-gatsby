import { Container } from "@mui/material";
import { useLocales } from "locales";
import React, { FC, useEffect } from "react";
import Helmet from "react-helmet";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import BlockHeader from "./BlockHeader";
import BlockInfoCustomer from "./BlockInfoCustomer";
import { useOrderDetail } from "scenes/orders/hooks/useOrderDetail";
import BlockInfoOrder from "./BlockInfoOrder";
import BlockPriceOrder from "./BlockPriceOrder";
import BlockEmployeeInfo from "./BlockEmployeeInfo";
import BlockTimeLine from "./BlockTimeline";
type IProps = {
  orderId: number;
};

const OrderDetail: FC<IProps> = ({ orderId }) => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { loading, orderDetail, onOrderDetail } = useOrderDetail(orderId);
  const { translate } = useLocales();

  useEffect(() => {
    onOrderDetail();
  }, []);
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Helmet title={translate("orders.orderProcessing.detail", { orderId })} />
      {/* <BlockHeader orderId={orderId} /> */}
      <BlockInfoCustomer data={orderDetail} loading={loading} />
      <BlockInfoOrder data={orderDetail} loading={loading} />
      <BlockPriceOrder data={orderDetail} loading={loading} />
      <BlockEmployeeInfo data={orderDetail} loading={loading} />
      <BlockTimeLine data={orderDetail} loading={loading} />
    </Container>
  );
};
export default OrderDetail;
