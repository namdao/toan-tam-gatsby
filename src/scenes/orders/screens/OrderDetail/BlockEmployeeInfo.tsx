import {
  Grid,
  Card,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocales } from "locales";
import React, { FC } from "react";
import { BlockInfoOrderSkelekton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import { StyleTitleTypo, StyledIcon } from "./style";
import { IOrderDetail } from "scenes/orders/redux/types";
import appConstant from "constant/appConstant";
import { format, parseISO } from "date-fns";

const { ROLES } = appConstant;
type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
  loading: boolean;
};
const BlockEmployeeInfo: FC<IPropsInfoOrder> = ({ data, loading }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  if (loading) {
    return (
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <BlockInfoOrderSkelekton />
      </Grid>
    );
  }
  const { saler, user } = data || {};
  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid item xs={12} md={12}>
        <Card>
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
                  {translate("orders.orderDetail.employee.dateHandlerPO")}
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
    </Grid>
  );
};
export default BlockEmployeeInfo;
