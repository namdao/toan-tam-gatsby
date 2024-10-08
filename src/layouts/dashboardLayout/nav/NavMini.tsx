import React from "react";
// @mui
import { Stack, Box } from "@mui/material";
// config
import { NAV } from "constant/layoutConstant";
// utils
import { hideScrollbarX } from "utils/cssStyles";
// components
import Logo from "components/logo";
import { NavSectionMini } from "components/navSection";
//
import navConfig from "constant/navConstant";
import NavToggleButton from "./NavToggleButton";

// ----------------------------------------------------------------------
type Props = {
  menuList: typeof navConfig;
};
export default function NavMini({ menuList }: Props) {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: "auto", my: 2 }} sizeLogo={60} />

        <NavSectionMini data={menuList} />
      </Stack>
    </Box>
  );
}
