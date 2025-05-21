import {
  Card,
  CardHeader,
  Grid,
  Stack,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Typography,
} from "@mui/material";
import Label from "components/label";
import React, { FC, useMemo } from "react";
import { BlockInfoOrderSkelekton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import { IOrderDetail } from "scenes/orders/redux/types";
import { useLocales } from "locales";
import { StyleTitleTypo, StyleTableCell } from "./style";
import { fNumber } from "utils/formatNumber";
import {
  getDataOutsource,
  getTotalAmount,
  getTotalBasicFee,
} from "utils/utility";
import BlockTimeLine from "./BlockTimeline";
import BlockWithImg from "./BlockWithImg";
import { parseISO, format } from "date-fns";
import { IOurSources } from "constant/commonType";
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

  const renderNoteBlock = () => (
    <Card sx={{mt:1}}>
      <CardHeader
        title={translate("orders.orderDetail.info.notePrint")}
        sx={{ color: (theme) => theme.palette.primary.main }}
      />
      <Stack sx={{ px: 3 , py: 1}}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">
            {data?.order_detail_notes}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );

  const renderBlockProductInfo = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <StyleTableCell colSpan={3}>{renderFristRow()}</StyleTableCell>
          </TableRow>
          <TableRow>
            <StyleTableCell colSpan={3}>
              <Stack direction="row" spacing={1}>
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.info.category")}
                </StyleTitleTypo>
                <Typography variant="subtitle2" textAlign="right">
                  {data?.category?.category_name} - {data?.paper?.paper_name}
                </Typography>
              </Stack>
            </StyleTableCell>
          </TableRow>
          <TableRow>
            <StyleTableCell>
              <Stack direction="column" spacing={1} alignItems={"center"}>
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.info.method")}
                </StyleTitleTypo>
                <Typography variant="h5" sx={{ color: "red" }}>
                  {data?.method}
                </Typography>
              </Stack>
            </StyleTableCell>
            <StyleTableCell>
              <Stack direction="column" spacing={1} alignItems={"center"}>
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.info.paper")}
                </StyleTitleTypo>
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  {data?.paper?.paper_name}
                </Typography>
              </Stack>
            </StyleTableCell>
            <StyleTableCell>
              <Stack direction="column" spacing={1} alignItems={"center"}>
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.dateCreatePO")}
                </StyleTitleTypo>
                <Typography variant="subtitle1">
                  {`${
                    data?.created_time &&
                    format(parseISO(data?.created_time), "dd/MM/yyyy HH:mm")
                  }`}
                </Typography>
              </Stack>
            </StyleTableCell>
          </TableRow>
          <TableRow>
            <StyleTableCell>
              <Stack
                direction="row"
                spacing={1}
                justifyContent={"space-between"}
              >
                {translate("orders.orderDetail.billInfo.template")}
                <Typography variant="h5" sx={{ color: "red" }}>
                  {data?.template_number
                    ? fNumber(data.template_number.toString())
                    : "-"}
                </Typography>
              </Stack>
            </StyleTableCell>
            <StyleTableCell rowSpan={2}>
              <Stack direction="column" spacing={1} alignItems={"center"}>
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.info.printType")}
                </StyleTitleTypo>
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  {data?.print_types.map((e) => e.print_type_name)}
                </Typography>
              </Stack>
            </StyleTableCell>
            <StyleTableCell rowSpan={2}>
              <Stack direction="column" spacing={1} alignItems={"center"}>
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.delivery.deliveryDay")}
                </StyleTitleTypo>
                <Typography variant="subtitle1"  sx={{ color: "red" }}>{`${
                  data?.delivery_date && data.delivery_date !== "None"
                    ? format(parseISO(data?.delivery_date), "dd/MM/yyyy HH:mm")
                    : "-"
                }`}</Typography>
              </Stack>
            </StyleTableCell>
          </TableRow>
          <TableRow>
            <StyleTableCell>
              <Stack
                direction="row"
                spacing={1}
                justifyContent={"space-between"}
              >
                {translate("orders.orderDetail.billInfo.quantity")}
                <Typography variant="h5" sx={{ color: "red" }}>
                  {data?.quantity ? fNumber(data.quantity.toString()) : "-"}
                </Typography>
              </Stack>
            </StyleTableCell>
          </TableRow>
        </TableHead>
      </Table>
    );
  };
  const renderRowOutSource = (outsources: IOurSources[]) => {
    const { dataGroupOutsources, keyOutSource } = getDataOutsource(outsources);
    return keyOutSource.map((nameKey) => {
      const listChildByKey = dataGroupOutsources[nameKey];
      return (
        <Stack direction="row" sx={{ pb: 1 }}>
          <Typography variant="body2">{nameKey}</Typography>
          <Stack direction="row" flexWrap="wrap" sx={{ flex: 1 }}>
            {listChildByKey.map((child) => {
              return <Label sx={{ mx: 1 }}>{child.name}</Label>;
            })}
          </Stack>
        </Stack>
      );
    });
  };

  return (
    <Grid container spacing={3} sx={{ pt: 1 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: 390 }}>
          <CardHeader
            title={translate("orders.orderDetail.info.title")}
            sx={{ color: (theme) => theme.palette.primary.main }}
          />
          <Stack spacing={1} sx={{ px: 3, py: 1 }}>
            {renderBlockProductInfo()}
            {data && data?.outsources.length > 0 ? (
              renderRowOutSource(data.outsources)
            ) : (
              <Label>Không gia công</Label>
            )}
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <BlockWithImg data={data} />
        {renderNoteBlock()}
      </Grid>
      <Grid item xs={12} md={12}>
        <BlockTimeLine data={data} loading={loading} />
      </Grid>
    </Grid>
  );
};
export default BlockInfoOrder;
