import {
  Card,
  CardHeader,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import React, { FC, memo } from "react";
import { IOrderDetail } from "scenes/orders/redux/types";
import { format, parseISO } from "date-fns";
import {
  BlockInfoCustomerSkeleton,
  BlockInfoDeliverySekelton,
} from "scenes/orders/components/BlockOrderDetailSkeleton";
import { StyledIcon, StyleTitleTypo } from "./style";

type IPropsCustomer = {
  data: IOrderDetail | undefined;
  loading: boolean;
};
const BlockInfoCustomer: FC<IPropsCustomer> = ({ data, loading }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const renderCustomerInfo = () => (
    <Grid item xs={12} md={5}>
      <Card>
        <CardHeader
          title={translate("orders.orderDetail.customer.title")}
          sx={{ color: theme.palette.primary.main }}
          action={
            <Iconify
              sx={{ mt: 1 }}
              icon="material-symbols:edit-document-outline"
              width={ICON.NAV_ITEM}
            />
          }
        />
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row">
            <StyledIcon icon="mdi:user" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.name")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{data?.customer?.name}</Typography>
          </Stack>

          <Stack direction="row">
            <StyledIcon icon="eva:email-fill" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.email")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{data?.customer?.email}</Typography>
          </Stack>

          <Stack direction="row">
            <StyledIcon icon="material-symbols:phone-enabled-outline" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.phone")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{data?.customer?.phone}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="ic:round-business-center" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.customer.company")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.customer?.company?.company_name}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ pt: 2.5 }}></Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderReiveInfo = () => (
    <Grid item xs={12} md={7}>
      <Card>
        <CardHeader
          title={translate("orders.orderDetail.delivery.title")}
          sx={{ color: theme.palette.primary.main }}
        />
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row">
            <StyledIcon icon="mdi:user" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.name")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{data?.receiver_info}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="material-symbols:phone-enabled-outline" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.phone")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{data?.customer?.phone}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="la:address-card" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.address")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">
              {data?.delivery_address}
            </Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="ic:baseline-date-range" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.receiveDay")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{`${
              data?.created_time &&
              format(parseISO(data?.created_time), "dd/MM/yyyy HH:mm")
            }`}</Typography>
          </Stack>
          <Stack direction="row">
            <StyledIcon icon="ic:baseline-date-range" />
            <StyleTitleTypo variant="body2">
              {translate("orders.orderDetail.delivery.deliveryDay")}
            </StyleTitleTypo>
            <Typography variant="subtitle2">{`${
              data?.delivery_date &&
              format(parseISO(data?.delivery_date || ""), "dd/MM/yyyy HH:mm")
            }`}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <Grid container spacing={3}>
        <BlockInfoCustomerSkeleton />
        <BlockInfoDeliverySekelton />
      </Grid>
    );
  }
  return (
    <Grid container spacing={3}>
      {renderCustomerInfo()}
      {renderReiveInfo()}
    </Grid>
  );
};
export default memo(BlockInfoCustomer);
