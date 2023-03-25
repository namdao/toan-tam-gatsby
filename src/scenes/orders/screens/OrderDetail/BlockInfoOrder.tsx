import {
  Card,
  CardHeader,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Label from "components/label";
import React, { FC, useMemo } from "react";
import { BlockInfoOrderSkelekton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import { IOrderDetail } from "scenes/orders/redux/types";
import { useLocales } from "locales";
import { StyledIcon, StyleTitleTypo } from "./style";
type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
  loading: boolean;
};

const BlockInfoOrder: FC<IPropsInfoOrder> = ({ data, loading }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const rollingItem = useMemo(() => {
    return data?.outsources?.filter((item) => item.group === "rolling");
  }, [data]);
  const outsoureItem = useMemo(() => {
    return data?.outsources?.filter((item) => item.group === "other");
  }, [data]);
  if (loading) {
    return (
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <BlockInfoOrderSkelekton />
      </Grid>
    );
  }
  const renderFristRow = () => (
    <Stack direction="row" alignItems="center" display="flex" spacing={2}>
      <Stack direction="row" sx={{ flex: 1 }}>
        <StyledIcon icon="material-symbols:file-copy-outline" />
        <StyleTitleTypo variant="body2">
          {translate("orders.orderDetail.info.name")}
        </StyleTitleTypo>
        <Typography variant="subtitle2">{data?.name}</Typography>
      </Stack>
      <Stack direction="row" sx={{ flex: 1 }}>
        <StyledIcon icon="bx:category-alt" />
        <StyleTitleTypo variant="body2">
          {translate("orders.orderDetail.info.category")}
        </StyleTitleTypo>
        <Typography variant="subtitle2">
          <Label>
            {data?.category?.category_name} - {data?.paper.paper_name}
          </Label>
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ flex: 1 }}>
        <StyledIcon icon="mdi:paper-outline" />
        <StyleTitleTypo variant="body2">
          {translate("orders.orderDetail.info.paper")}
        </StyleTitleTypo>
        <Typography variant="subtitle2">{data?.paper?.paper_name}</Typography>
      </Stack>
    </Stack>
  );

  const renderSecondRow = () => (
    <Stack direction="row" alignItems="center" display="flex" spacing={2}>
      <Stack direction="row" sx={{ flex: 1 }}>
        <StyledIcon icon="mdi:paper-text-outline" />
        <StyleTitleTypo variant="body2">
          {translate("orders.orderDetail.info.printType")}
        </StyleTitleTypo>
        <Typography variant="subtitle2">
          {data?.print_types.map((e) => e.print_type_name)}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ flex: 1 }}>
        <StyledIcon icon="material-symbols:width-wide-outline" />
        <StyleTitleTypo variant="body2">
          {translate("orders.orderDetail.info.method")}
        </StyleTitleTypo>
        <Typography variant="subtitle2">{data?.method} mm</Typography>
      </Stack>
      <Stack direction="row" sx={{ flex: 1 }}>
        <StyledIcon icon="ic:outline-photo-camera-back" />
        <StyleTitleTypo variant="body2">
          {translate("orders.orderDetail.info.numPrintFace")}
        </StyleTitleTypo>
        <Typography variant="subtitle2">
          {rollingItem &&
            rollingItem?.length > 0 &&
            rollingItem[0].name + " - " + data?.number_print_face + "mặt"}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderThirdRow = () => (
    <Stack direction="row">
      <StyledIcon icon="material-symbols:work-history-outline-sharp" />
      <StyleTitleTypo variant="body2">
        {translate("orders.orderDetail.info.outsource")}
      </StyleTitleTypo>
      {outsoureItem?.map((e) => (
        <Label sx={{ mr: 1 }}>{e.name}</Label>
      ))}
    </Stack>
  );

  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader
            title={
              translate("orders.orderDetail.info.title") + " " + data?.order_no
            }
            sx={{ color: theme.palette.primary.main }}
          />
          <Stack spacing={2} sx={{ p: 3 }}>
            {renderFristRow()}
            {renderSecondRow()}
            {renderThirdRow()}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};
export default BlockInfoOrder;
