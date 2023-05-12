import {
  Grid,
  Card,
  CardHeader,
  Stack,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { useLocales } from "locales";
import React, { FC } from "react";
import { BlockInfoOrderSkelekton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import { StyleTitleTypo } from "./style";
import { IOrderDetail } from "scenes/orders/redux/types";
import { fNumber } from "utils/formatNumber";
import Label from "components/label";

type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
  loading: boolean;
};
const BlockPriceOrder: FC<IPropsInfoOrder> = ({ data, loading }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  if (loading) {
    return (
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <BlockInfoOrderSkelekton />
      </Grid>
    );
  }
  const amount = data
    ? fNumber(
        data.template_number * data.unit_price * data.quantity +
          (data.shipping_fee + data.design_fee - data.deposite)
      )
    : 0;
  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader
            title={translate("orders.orderDetail.price.title")}
            sx={{ color: theme.palette.primary.main }}
          />
          <Stack direction="row" justifyContent="space-between" sx={{ p: 3 }}>
            <Stack alignItems="center">
              <Typography variant="subtitle1">
                {translate("orders.orderDetail.price.template")}
              </Typography>
              <Typography variant="body1">
                {data?.template_number
                  ? fNumber(data.template_number.toString())
                  : 0}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="subtitle1">
                {translate("orders.orderDetail.price.quantity")}
              </Typography>
              <Typography variant="body1">
                {data?.quantity ? fNumber(data.quantity.toString()) : 0}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="subtitle1">
                {translate("orders.orderDetail.price.unitPrice")}
              </Typography>
              <Typography variant="body1">
                {" "}
                {data?.unit_price ? fNumber(data.unit_price.toString()) : "-"}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="subtitle1">
                {translate("orders.orderDetail.price.designFee")}
              </Typography>
              <Typography variant="body1">
                {data?.design_fee ? fNumber(data.design_fee.toString()) : "-"}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="subtitle1">
                {translate("orders.orderDetail.price.shippingFee")}
              </Typography>
              <Typography variant="body1">
                {data?.shipping_fee
                  ? fNumber(data?.shipping_fee?.toString())
                  : "-"}
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="subtitle1">
                {translate("orders.orderDetail.price.deposite")}
              </Typography>
              <Typography variant="body1">
                {data?.deposite ? fNumber(data.deposite?.toString()) : "-"}
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mx: 3 }} />
          <Stack
            justifyContent="flex-end"
            direction="row"
            sx={{ p: 3 }}
            spacing={2}
          >
            <StyleTitleTypo variant="h5">
              {translate("orders.orderDetail.price.amount")}
            </StyleTitleTypo>
            <Label color="error">
              <Typography variant="h5">{amount} VNĐ</Typography>
            </Label>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlockPriceOrder;
