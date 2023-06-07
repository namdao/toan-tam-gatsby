import React from "react";
import Iconify from "components/iconify";
import { useTheme } from "@mui/material/styles";
import { ContainerBtn, IconBtn } from "./stylesBtnCreate";

const BtnCreateOrder = () => {
  const theme = useTheme();
  return (
    <ContainerBtn backgroundColor={theme.palette.primary.main}>
      <Iconify width={24} icon="material-symbols:add" />
      <IconBtn backgroundColor={theme.palette.primary.main} />
    </ContainerBtn>
  );
};
export default BtnCreateOrder;
