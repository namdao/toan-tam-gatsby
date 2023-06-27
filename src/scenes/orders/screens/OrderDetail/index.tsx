import { Container } from "@mui/material";
import { useLocales } from "locales";
import React, { FC, useEffect } from "react";
import Helmet from "react-helmet";
import BlockInfoCustomer from "./BlockInfoCustomer";
import { useOrderDetail } from "scenes/orders/hooks/useOrderDetail";
import BlockInfoOrder from "./BlockInfoOrder";
import BlockOutsourceWithImg from "./BlockOutsourceWithImg";
// import BlockTimeLine from "./BlockTimeline";
type IProps = {
  orderId: number;
};

const OrderDetail: FC<IProps> = ({ orderId }) => {
  const { loading, orderDetail, onOrderDetail } = useOrderDetail(orderId);
  const { translate } = useLocales();

  useEffect(() => {
    onOrderDetail();
  }, []);
  return (
    <Container
      sx={{
        maxWidth: "1920px!important",
      }}
    >
      <Helmet title={translate("orders.orderProcessing.detail", { orderId })} />
      {/* <BlockHeader orderId={orderId} /> */}
      <BlockInfoCustomer data={orderDetail} loading={loading} />
      <BlockInfoOrder data={orderDetail} loading={loading} />
      {/* <BlockTimeLine data={orderDetail} loading={loading} /> */}
    </Container>
  );
};
export default OrderDetail;
