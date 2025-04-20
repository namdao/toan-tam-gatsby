import { Card, CardHeader, Grid, Stack, Typography } from "@mui/material";
import Label from "components/label";
import React, { FC, useMemo } from "react";
import { BlockInfoOrderSkelekton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import { IOrderDetail } from "scenes/orders/redux/types";
import { useLocales } from "locales";
import { StyleTitleTypo } from "./style";
import { fNumber } from "utils/formatNumber";
import { getTotalAmount, getTotalBasicFee } from "utils/utility";
import BlockTimeLine from "./BlockTimeline";
import BlockOutsourceWithImg from "./BlockOutsourceWithImg";
type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
  loading: boolean;
};

const BlockInfoOrder: FC<IPropsInfoOrder> = ({ data, loading }) => {
  const { translate } = useLocales();
  if (loading) {
    return (
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <BlockInfoOrderSkelekton />
      </Grid>
    );
  }

  const blockPriceInfo = () => {
    return (
      <Grid container xs={12} md={12} spacing={2}>
        {renderPriceBasicCol()}
        {renderPriceFeeCol()}
        {renderTotalCol()}
      </Grid>
    );
  };
  const renderPriceBasicCol = () => {
    return (
      <Grid item xs={12} md={4}>
        <Stack justifyContent="space-between">
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.template")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.template_number
                ? fNumber(data.template_number.toString())
                : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.quantity")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.quantity ? fNumber(data.quantity.toString()) : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.unitPrice")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.unit_price ? fNumber(data.unit_price.toString()) : "-"}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    );
  };

  const renderPriceFeeCol = () => {
    return (
      <Grid item xs={12} md={4}>
        <Stack justifyContent="space-between">
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.designFee")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.design_fee ? fNumber(data.design_fee.toString()) : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.shippingFee")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.shipping_fee ? fNumber(data.shipping_fee.toString()) : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.deposite")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.deposite ? fNumber(data.deposite.toString()) : "-"}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    );
  };

  const renderTotalCol = () => {
    return (
      <Grid item xs={12} md={4}>
        <Stack justifyContent="space-between">
          <Stack direction="row" justifyContent="space-between">
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.price.amount")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data ? fNumber(getTotalBasicFee(data)) : "0"}
            </Typography>
          </Stack>
          <Stack justifyContent="space-between">
            <StyleTitleTypo variant="subtitle1">
              {translate("orders.orderDetail.price.finalAmount")}
            </StyleTitleTypo>
            <Label color="error">
              <Typography variant="subtitle1">
                {data && fNumber(getTotalAmount(data))} VNĐ
              </Typography>
            </Label>
          </Stack>
        </Stack>
      </Grid>
    );
  };
  const renderFristRow = () => (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StyleTitleTypo variant="body2">
        {translate("orders.orderDetail.info.name")}
      </StyleTitleTypo>
      <Typography variant="subtitle2">{data?.name}</Typography>
    </Stack>
  );

  const renderSecondRow = () => (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={1}>
          <StyleTitleTypo variant="body2">
            {translate("orders.orderDetail.info.category")}
          </StyleTitleTypo>
          <Typography variant="subtitle2" textAlign="right">
            {data?.category?.category_name} - {data?.paper?.paper_name}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={1}>
          <StyleTitleTypo variant="body2">
            {translate("orders.orderDetail.info.printType")}
          </StyleTitleTypo>
          <Typography variant="subtitle2">
            {data?.print_types.map((e) => e.print_type_name)}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );

  const renderThirdRow = () => (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={1}>
          <StyleTitleTypo variant="body2">
            {translate("orders.orderDetail.info.paper")}
          </StyleTitleTypo>
          <Typography variant="subtitle2">{data?.paper?.paper_name}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={1}>
          <StyleTitleTypo variant="body2">
            {translate("orders.orderDetail.info.method")}
          </StyleTitleTypo>
          <Typography variant="subtitle2">{data?.method} mm</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
  const renderFourthRow = () => (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Stack direction="row" spacing={1}>
          <StyleTitleTypo variant="body2">
            {translate("orders.orderDetail.info.notePrint")}
          </StyleTitleTypo>
          <Typography variant="subtitle2">
            {data?.order_detail_notes}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title={
              translate("orders.orderDetail.info.title") + " " + data?.order_no
            }
            sx={{ color: (theme) => theme.palette.primary.main }}
          />
          <Stack spacing={2} sx={{ p: 3 }}>
            {blockPriceInfo()}
            {renderFristRow()}
            {renderSecondRow()}
            {renderThirdRow()}
            {renderFourthRow()}
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <BlockOutsourceWithImg data={data} />
      </Grid>
      <Grid item xs={12} md={12}>
        <BlockTimeLine data={data} loading={loading} />
      </Grid>
    </Grid>
  );
};
export default BlockInfoOrder;
