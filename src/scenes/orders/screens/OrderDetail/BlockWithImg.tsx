import { Box, Card, Stack, useTheme, Typography, Grid } from "@mui/material";
import React, { FC } from "react";
import { IOrderDetail } from "scenes/orders/redux/types";
import ImagePopup from "scenes/orders/components/ImagePopup";
import { getImageToAws } from "utils/imageHandler";
import { useLocales } from "locales";

type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
};
const BlockWithImg: FC<IPropsInfoOrder> = ({ data }) => {
  const theme = useTheme();
  const { translate } = useLocales();

  const images =
    data && data?.images && data?.images?.length > 0
      ? data.images.map((img) => getImageToAws(img))
      : [];

  if (images.length === 0) {
    return null;
  }

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {translate("orders.orderDetail.titleImage")}
        </Typography>
        <Grid container spacing={2}>
          {images.map((imgUrl, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  borderRadius: 3,
                  borderWidth: 3,
                  borderStyle: "solid",
                  borderColor: theme.palette.primary.main,
                  overflow: "hidden",
                }}
              >
                <ImagePopup url={[imgUrl]} width="100%" height="100%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Card>
  );
};
export default BlockWithImg;
