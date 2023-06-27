import React from "react";
import Iconify from "components/iconify";
import { useTheme } from "@mui/material/styles";
import { ContainerBtn, IconBtn } from "./stylesBtnCreate";
import { navigate } from "gatsby";
import { PATH_APP } from "constant/routeConstant";

const BtnCreateOrder = () => {
  const theme = useTheme();

  const navigateOrderCreate = () => navigate(PATH_APP.order.create);
  return (
    <ContainerBtn
      backgroundColor={theme.palette.primary.main}
      onClick={navigateOrderCreate}
    >
      <Iconify width={24} icon="material-symbols:add" color="white" />
      <IconBtn backgroundColor={theme.palette.primary.main} />
    </ContainerBtn>
  );
};
export default BtnCreateOrder;
