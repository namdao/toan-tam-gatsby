import {
  Box,
  Card,
  CardHeader,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Label from "components/label";
import appConstant from "constant/appConstant";
import { useLocales } from "locales";
import { groupBy } from "lodash";
import React, { FC, useMemo } from "react";
import { IOrderDetail } from "scenes/orders/redux/types";
import Image from "components/image";
import ImagePopup from "scenes/orders/components/ImagePopup";

type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
};
const BlockOutsourceWithImg: FC<IPropsInfoOrder> = ({ data }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const dataGroupOutsources = useMemo(
    () => groupBy(data?.outsources, "group"),
    [data?.outsources]
  );
  const keyOutSource = useMemo(
    () => Object.keys(dataGroupOutsources),
    [dataGroupOutsources]
  );

  const imgUrl =
    data && data?.images && data?.images?.length > 0
      ? `${appConstant.URL_IMG}${data?.images[0]}`
      : null;

  const renderRowOutSource = () => {
    return keyOutSource.map((nameKey) => {
      const listChildByKey = dataGroupOutsources[nameKey];
      return (
        <Stack direction="row" sx={{ pb: 2 }}>
          <Typography variant="body2" sx={{ flex: 0.2 }}>
            {nameKey}
          </Typography>
          <Stack direction="row" flexWrap="wrap" sx={{ flex: 1 }}>
            {listChildByKey.map((child) => {
              return <Label sx={{ mx: 1, mb: 1 }}>{child.name}</Label>;
            })}
          </Stack>
        </Stack>
      );
    });
  };
  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader
            title={translate("orders.orderDetail.outsource.title")}
            sx={{ color: theme.palette.primary.main }}
          />
          <Stack sx={{ p: 3 }}>
            {renderRowOutSource()}
            {imgUrl && (
              <ImagePopup
                url={[imgUrl]}
                width="50%"
                height="50%"
                sx={{ margin: "auto" }}
              />
            )}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};
export default BlockOutsourceWithImg;
