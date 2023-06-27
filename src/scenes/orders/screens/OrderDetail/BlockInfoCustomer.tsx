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
import appConstants from "constant/appConstant";

const { ROLES } = appConstants;

type IPropsCustomer = {
  data: IOrderDetail | undefined;
  loading: boolean;
};
const BlockInfoCustomer: FC<IPropsCustomer> = ({ data, loading }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const renderCustomerInfo = () => (
    <Grid item xs={12} md={3}>
      <Card sx={{ height: 250 }}>
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

  const renderReiveInfo = () => (
    <Grid item xs={12} md={3}>
      <Card sx={{ height: 250 }}>
        <CardHeader
          title={translate("orders.orderDetail.delivery.title")}
          sx={{ color: theme.palette.primary.main }}
        />
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between">
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
              <Typography variant="subtitle2">
                {data?.customer?.phone}
              </Typography>
            </Stack>
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
              data?.delivery_date && data.delivery_date !== "None"
                ? format(parseISO(data?.delivery_date), "dd/MM/yyyy HH:mm")
                : "-"
            }`}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderEmployeeInfo = () => {
    const { saler, user } = data || {};
    return (
      <Grid item xs={12} md={6}>
        <Card sx={{ height: 250 }}>
          <CardHeader
            title={translate("orders.orderDetail.employee.title")}
            sx={{ color: theme.palette.primary.main }}
          />
          <Stack direction="row" justifyContent="flex-start">
            <Stack spacing={2} sx={{ p: 3, flex: 1 }}>
              <Stack direction="row">
                <StyledIcon icon="mdi:user-edit" />
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.creator")}
                </StyleTitleTypo>
                <Typography variant="subtitle2">
                  {saler && saler.username}
                </Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="mdi:user-clock-outline" />
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.handler")}
                </StyleTitleTypo>
                <Typography variant="subtitle2">
                  {user
                    ? user.username
                    : translate("orders.orderDetail.employee.noHandler")}
                </Typography>
              </Stack>

              <Stack direction="row">
                <StyledIcon icon="mdi:user-check-outline" />
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.warehouseStaff")}
                </StyleTitleTypo>
                <Typography variant="subtitle2">
                  {user && user.roles[0].name === ROLES.STORE
                    ? user.username
                    : translate("orders.orderDetail.employee.noHandler")}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={2} sx={{ p: 3, flex: 1 }}>
              <Stack direction="row">
                <StyledIcon icon="material-symbols:date-range-outline" />
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.dateCreatePO")}
                </StyleTitleTypo>
                <Typography variant="subtitle2">
                  {`${
                    data?.created_time &&
                    format(parseISO(data?.created_time), "dd/MM/yyyy HH:mm")
                  }`}
                </Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="material-symbols:date-range-outline" />
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.dateHandlerPO")}
                </StyleTitleTypo>
                <Typography variant="subtitle2">
                  {`${
                    data?.updated_time &&
                    format(parseISO(data?.updated_time), "dd/MM/yyyy HH:mm")
                  }`}
                </Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="material-symbols:date-range-outline" />
                <StyleTitleTypo variant="body2">
                  {translate("orders.orderDetail.employee.dateStorePO")}
                </StyleTitleTypo>
                <Typography variant="subtitle2">
                  {`${
                    data?.outsource_date
                      ? format(
                          parseISO(data?.outsource_date),
                          "dd/MM/yyyy HH:mm"
                        )
                      : "-"
                  }`}
                </Typography>
              </Stack>
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
    <Grid container spacing={3}>
      {renderCustomerInfo()}
      {renderReiveInfo()}
      {renderEmployeeInfo()}
    </Grid>
  );
};
export default memo(BlockInfoCustomer);
