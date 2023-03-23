import {
  Card,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "components/iconify";
import { Link } from "gatsby-theme-material-ui";
import { useLocales } from "locales";
import React, { FC } from "react";
import Helmet from "react-helmet";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import BlockHeader from "./BlockHeader";

type IProps = {
  orderId: string;
};
const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
const OrderDetail: FC<IProps> = ({ orderId }) => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Helmet title={translate("orders.orderProcessing.detail", { orderId })} />
      <BlockHeader orderId={orderId} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardHeader
              title="Thông tin khách hàng"
              action={
                <Iconify
                  sx={{ mt: 1 }}
                  icon="material-symbols:edit-document-outline"
                  width={24}
                />
              }
            />

            <Stack spacing={2} sx={{ p: 3 }}>
              <Stack direction="row">
                <StyledIcon icon="eva:pin-fill" />

                <Typography variant="body2">
                  Tên khách hàng &nbsp;
                  <Link
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    Diễm - Iris
                  </Link>
                </Typography>
              </Stack>

              <Stack direction="row">
                <StyledIcon icon="eva:email-fill" />
                <Typography variant="body2">hoangnam1121@gmail.com</Typography>
              </Stack>

              <Stack direction="row">
                <StyledIcon icon="ic:round-business-center" />

                <Typography variant="body2">
                  Số điện thoại &nbsp;
                  <Link
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    0987654321
                  </Link>
                </Typography>
              </Stack>

              <Stack direction="row">
                <StyledIcon icon="ic:round-business-center" />

                <Typography variant="body2">
                  Tên công ty &nbsp;
                  <Link
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    CÔNG TY TNHH TM DV IRIS
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader title="Thông tin giao hàng" />
            <Stack spacing={4.5} sx={{ p: 3 }}>
              <Stack direction="row">
                <StyledIcon icon="eva:pin-fill" />

                <Typography variant="body2">
                  Tên người nhận &nbsp;
                  <Link
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    Diễm - Iris
                  </Link>
                </Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="eva:pin-fill" />

                <Typography variant="body2">
                  Số điện thoại &nbsp;
                  <Link
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    0987654321
                  </Link>
                </Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="eva:pin-fill" />

                <Typography variant="body2">
                  Địa chỉ &nbsp;
                  <Link
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    229/40 Tây Thạnh , Quận Tân Phú, Phường Tây Thạnh, Hồ Chí
                    Minh
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default OrderDetail;
