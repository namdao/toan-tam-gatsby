import { Typography } from "@mui/material";
import Iconify from "components/iconify";
import { styled } from "@mui/material/styles";

export const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
export const StyleTitleTypo = styled(Typography)(() => ({
  paddingRight: 6,
}));