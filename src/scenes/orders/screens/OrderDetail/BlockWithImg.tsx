import {
  Box,
  Card,
  Stack,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import { IOrderDetail } from "scenes/orders/redux/types";
import ImagePopup from "scenes/orders/components/ImagePopup";
import { getImageToAws } from "utils/imageHandler";

type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
};
const BlockWithImg: FC<IPropsInfoOrder> = ({ data }) => {
  const theme = useTheme();

  const imgUrl =
    data && data?.images && data?.images?.length > 0
      ? getImageToAws(data.images[0])
      : null;

  return (
    <Card sx={{ height: 390 }}>
      <Stack sx={{ p: 3 }} alignItems="center">
        {imgUrl && (
          <Box
            sx={{
              width: "100%",
              height: 350,
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
            />
          </Box>
        )}
      </Stack>
    </Card>
    //   </Grid>
    // </Grid>
  );
};
export default BlockWithImg;
