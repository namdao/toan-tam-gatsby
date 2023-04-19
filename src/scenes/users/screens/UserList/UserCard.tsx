import React from "react";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Avatar,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
// utils
// components
import Image from "components/image";
import SvgColor from "components/svg-color";
import dataMockConstant from "constant/dataMockConstant";
import Svg from "utils/svg";
import { IResUser } from "scenes/users/redux/types";
import UserReport from "./UserReport";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import DialogUserUpdateSelect from "./DialogUserUpdateSelect";
import { ICON } from "constant/layoutConstant";
import Iconify from "components/iconify";

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

type Props = {
  user: IResUser;
  openUser: (user: IResUser) => void;
};

export default function UserCard({ user, openUser }: Props) {
  const theme = useTheme();
  const { first_name, last_name, username, roles, email, id } = user;
  const fullName = `${first_name} ${last_name}`;

  const onSetUser = () => {
    openUser(user);
  };
  return (
    <Card sx={{ textAlign: "center" }}>
      <Box
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          width: 30,
          height: 40,
          zIndex: 99,
          cursor: "pointer",
        }}
      >
        <Iconify
          width={ICON.NAV_ITEM}
          icon="material-symbols:edit-document-outline"
          color={theme.palette.background.default}
          onClick={onSetUser}
        />
      </Box>
      <Box sx={{ position: "relative" }}>
        <SvgColor
          src={Svg.shape.avatar}
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: "auto",
            position: "absolute",
            color: "background.paper",
          }}
        />

        <Avatar
          alt={username}
          src={dataMockConstant.avatar()}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />

        <StyledOverlay />

        <Image
          src={dataMockConstant.cover()}
          alt={dataMockConstant.cover()}
          ratio="16/9"
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        {fullName}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        <Typography component={"span"} variant="body2">
          {`Role: `}
        </Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          {roles?.[0]?.name || ""}
        </Box>
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {email}
      </Typography>

      <Divider sx={{ borderStyle: "dashed" }} />
      <UserReport userId={user.id} />
    </Card>
  );
}
