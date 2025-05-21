import {
  Card,
  CardHeader,
  Grid,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocales } from "locales";
import React, { FC, memo } from "react";
import { IOrderDetail } from "scenes/orders/redux/types";
import {
  BlockInfoCustomerSkeleton,
  BlockInfoDeliverySekelton,
} from "scenes/orders/components/BlockOrderDetailSkeleton";
import { StyledIcon, StyleTableCell, StyleTitleTypo } from "./style";
import { fNumber } from "utils/formatNumber";
import {
  getTotalDebit,
  getTotalDebitWithNoDeposite,
  getTotalVatFee,
} from "utils/utility";

type IPropsCustomer = {
  data: IOrderDetail | undefined;
  loading: boolean;
};
const BlockInfoCustomer: FC<IPropsCustomer> = ({ data, loading }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const renderCustomerInfo = () => (
    <Grid item xs={12} md={3}>
      <Card sx={{ height: 220 }}>
        <CardHeader
          title={translate("orders.orderDetail.customer.title")}
          sx={{ color: theme.palette.primary.main }}
        />
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row">
            <StyledIcon icon="mdi:user" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.name")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">{data?.customer?.name}</Typography>
          </Stack>

          <Stack direction="row">
            <StyledIcon icon="eva:email-fill" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.email")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">{data?.customer?.email}</Typography>
          </Stack>

          <Stack direction="row">
            <StyledIcon icon="material-symbols:phone-enabled-outline" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.phone")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">{data?.customer?.phone}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="ic:round-business-center" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.company")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">
              {data?.customer?.company?.company_name}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderReceiveInfo = () => (
    <Grid item xs={12} md={3}>
      <Card sx={{ height: 220 }}>
        <CardHeader
          title={translate("orders.orderDetail.delivery.title")}
          sx={{ color: theme.palette.primary.main }}
        />
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row">
            <StyledIcon icon="mdi:user" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.name")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">{data?.receiver_info}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="material-symbols:phone-enabled-outline" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.phone")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">{data?.customer?.phone}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="la:address-card" />
            {/* <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.address")}
            </StyleTitleTypo> */}
            <Typography variant="subtitle2">
              {data?.delivery_address}
            </Typography>
          </Stack>
          {/* <Stack direction="row">
            <StyledIcon icon="ic:baseline-date-range" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.receiveDay")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{`${
              data?.created_time &&
              format(parseISO(data?.created_time), "dd/MM/yyyy HH:mm")
            }`}</Typography>
          </Stack> */}
          {/* <Stack direction="row">
            <StyledIcon icon="ic:baseline-date-range" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.deliveryDay")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{`${
              data?.delivery_date && data.delivery_date !== "None"
                ? format(parseISO(data?.delivery_date), "dd/MM/yyyy HH:mm")
                : "-"
            }`}</Typography>
          </Stack> */}
        </Stack>
      </Card>
    </Grid>
  );

  const renderBillInfo = () => {
    return (
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title={translate("orders.orderDetail.billInfo.title")}
            sx={{ color: theme.palette.primary.main }}
          />
          <Stack direction="row" justifyContent="flex-start">
            <Stack sx={{ p: 1, flex: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.template")}
                        </Typography>
                        <Typography variant="h5">
                          {data?.template_number
                            ? fNumber(data.template_number.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.designFee")}
                        </Typography>
                        <Typography variant="h5">
                          {data?.design_fee
                            ? fNumber(data.design_fee.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.deposite")}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          {data?.deposite
                            ? fNumber(data.deposite.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                  </TableRow>
                  <TableRow>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.quantity")}
                        </Typography>
                        <Typography variant="h5">
                          {data?.quantity
                            ? fNumber(data.quantity.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.otherFee")}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          {data?.other_fee
                            ? fNumber(data.other_fee.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                    <StyleTableCell colSpan={2}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.amount")}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          {data
                            ? fNumber(getTotalDebitWithNoDeposite(data))
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                  </TableRow>
                  <TableRow>
                    <StyleTableCell rowSpan={2} sx={{ textAlign: "center" }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.unitPrice")}
                        </Typography>
                        <Typography variant="h5">
                          {data?.unit_price
                            ? fNumber(data.unit_price.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.shippingFee")}
                        </Typography>
                        <Typography variant="h5">
                          {data?.shipping_fee
                            ? fNumber(data.shipping_fee.toString())
                            : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                    <StyleTableCell rowSpan={2} sx={{ textAlign: "center" }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate(
                            "orders.orderDetail.billInfo.remainingAmount"
                          )}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: 30,
                          }}
                        >
                          {data ? fNumber(getTotalDebit(data)) : "-"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                  </TableRow>
                  <TableRow>
                    <StyleTableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body2">
                          {translate("orders.orderDetail.billInfo.vatFee")}
                        </Typography>
                        <Typography variant="h5">
                          {data?.vat_fee
                            ? `(${fNumber(data.vat_fee.toString())}%)` +
                              fNumber(getTotalVatFee(data))
                            : " -"}
                        </Typography>
                      </Stack>
                    </StyleTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        <BlockInfoCustomerSkeleton />
        <BlockInfoDeliverySekelton />
      </Grid>
    );
  }
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {renderCustomerInfo()}
      {renderReceiveInfo()}
      {renderBillInfo()}
    </Grid>
  );
};
export default memo(BlockInfoCustomer);
