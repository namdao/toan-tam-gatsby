import React, { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material";
// components
import { CustomAvatar } from "components/customAvatar";
import { useSnackbar } from "components/snackbar";
import MenuPopover from "components/menuPopover";
import IconButtonAnimate from "components/animate/IconButtonAnimate";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import useAuth from "scenes/auth/hooks/useAuth";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: PATH_APP.user.profile,
  },
  {
    label: "Settings",
    linkTo: PATH_APP.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { onSignOut } = useAuth();
  const user = useAppSelector(AuthSelector.getProfile);

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    onSignOut();
    handleClosePopover();
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    navigate(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={""} alt={user?.userName} name={user?.userName} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.firstName} {user?.lastName}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
