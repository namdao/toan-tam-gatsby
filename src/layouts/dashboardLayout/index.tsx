import React, { useState } from "react";
// @mui
import { Box } from "@mui/material";
// hooks
import useResponsive from "utils/useResponsive";
// auth
import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import NavHorizontal from "./nav/NavHorizontal";
import AuthGuard from "manager/guardManager/AuthGuard";
import { useAppSelector } from "store";
import { SettingsSelector } from "services/settings/redux/slice";
import { listMenuByRole } from "utils/utility";
import { AuthSelector } from "scenes/auth/redux/slice";

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const themeLayout = useAppSelector(SettingsSelector.getThemeLayout);
  const isDesktop = useResponsive("up", "lg");
  const roles = useAppSelector(AuthSelector.getRolesUser)[0]?.name;
  const menuList = listMenuByRole(roles);
  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} menuList={menuList} onCloseNav={handleClose} />
  );

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: "flex" },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? <NavMini menuList={menuList} /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };
  return renderContent();
}
