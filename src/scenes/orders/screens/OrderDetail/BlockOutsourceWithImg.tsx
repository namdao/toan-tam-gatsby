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
import { useLocales } from "locales";
import { groupBy } from "lodash";
import React, { FC, useMemo } from "react";
import { IOrderDetail } from "scenes/orders/redux/types";
import ImagePopup from "scenes/orders/components/ImagePopup";
import { getImageToAws } from "utils/imageHandler";
import { getDataOutsource } from "utils/utility";
import { IOurSources } from "constant/commonType";

type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
};
const BlockOutsourceWithImg: FC<IPropsInfoOrder> = ({ data }) => {
  const { translate } = useLocales();
  const theme = useTheme();

  const imgUrl =
    data && data?.images && data?.images?.length > 0
      ? getImageToAws(data.images[0])
      : null;

  const renderRowOutSource = (outsources: IOurSources[]) => {
    const { dataGroupOutsources, keyOutSource } = getDataOutsource(outsources);
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
    // <Grid container spacing={3} sx={{ pt: 3 }}>
    //   <Grid item xs={12} md={12}>
    <Card>
      <CardHeader
        title={translate("orders.orderDetail.outsource.title")}
        sx={{ color: theme.palette.primary.main }}
      />
      <Stack sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            {data && data?.outsources.length > 0 ? (
              renderRowOutSource(data.outsources)
            ) : (
              <Label>Không gia công</Label>
            )}
          </Grid>
          <Grid item xs={6} md={6}>
            {imgUrl && (
              <Box
                sx={{
                  width: 220,
                  height: 220,
                  borderRadius: 3,
                  borderWidth: 5,
                  borderStyle: "solid",
                  borderColor: theme.palette.primary.main,
                  overflow: "hidden",
                }}
              >
                <ImagePopup
                  url={[imgUrl]}
                  width="100%"
                  height="100%"
                  sx={{ margin: "auto" }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Card>
    //   </Grid>
    // </Grid>
  );
};
export default BlockOutsourceWithImg;
