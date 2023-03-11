import React from "react";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// routes
// components
import { CustomAvatar } from "components/customAvatar";
import { PATH_APP } from "constant/routeConstant";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavAccount() {
  const user = useAppSelector(AuthSelector.getProfile);

  return (
    <Link
      component="a"
      href={PATH_APP.profile}
      underline="none"
      color="inherit"
    >
      <StyledRoot>
        <CustomAvatar src={""} alt={user?.userName} name={user?.userName} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.userName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            {user?.roles[0]?.name}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
