import { Stack, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "components/iconify";
import Label from "components/label";
import { ICON } from "constant/layoutConstant";
import React from "react";

const BlockDescription = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={{
        xs: "row",
        md: "row",
      }}
      sx={{ pl: 2 }}
      alignItems="center"
    >
      <Typography variant="h6">Ghi chú:</Typography>
      <Stack
        spacing={3}
        direction={{
          xs: "row",
          md: "row",
        }}
        sx={{ px: 1, py: 2 }}
      >
        <Stack
          spacing={1}
          direction={{
            xs: "row",
            md: "row",
          }}
          alignItems="center"
        >
          <Label color="primary">Đơn hàng bình thường</Label>
        </Stack>
        <Stack
          spacing={1}
          direction={{
            xs: "row",
            md: "row",
          }}
          alignItems="center"
        >
          <Iconify
            width={ICON.NAV_ITEM}
            icon="mdi:number-three-circle-outline"
            color={theme.palette.warning.main}
          />
          <Label color="warning">Đơn hàng quá 3 ngày chưa thay đổi</Label>
        </Stack>
        <Stack
          spacing={1}
          alignItems="center"
          direction={{
            xs: "row",
            md: "row",
          }}
        >
          <Iconify
            width={ICON.NAV_ITEM}
            icon="mdi:number-five-circle-outline"
            color={theme.palette.error.main}
          />
          <Label color="error">Đơn hàng quá 5 ngày chưa thay đổi</Label>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default BlockDescription;
