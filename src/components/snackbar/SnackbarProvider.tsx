import React, { useRef } from "react";
import { SnackbarProvider as NotistackProvider, SnackbarKey } from "notistack";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Collapse, IconButton } from "@mui/material";
import Iconify, { IconifyProps } from "components/iconify";
import StyledNotistack from "./styles";
import { useAppSelector } from "store";
import { SettingsSelector } from "services/settings/redux/slice";

type Props = {
  children: React.ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const themeDirection = useAppSelector(SettingsSelector.getThemeDirection);

  const isRTL = themeDirection === "rtl";

  const notistackRef = useRef<any>(null);

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        TransitionComponent={isRTL ? Collapse : undefined}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          info: <SnackbarIcon icon="eva:info-fill" color="info" />,
          success: (
            <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />
          ),
          warning: (
            <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />
          ),
          error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />,
        }}
        // With close as default
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}

// ----------------------------------------------------------------------

type SnackbarIconProps = {
  icon: IconifyProps;
  color: "info" | "success" | "warning" | "error";
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].lighter, 0.5),
      }}
    >
      <Iconify icon={icon} width={24} />
    </Box>
  );
}
