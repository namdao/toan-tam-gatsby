import React from "react";
import { Box } from "@mui/material";
import Iconify from "components/iconify";
import "./style.css";

const BtnCreateOrder = () => (
  <Box
    id="calltrap-btn"
    className="b-calltrap-btn calltrap_offline hidden-phone visible-tablet"
  >
    <Iconify id="calltrap-ico" width={24} icon="material-symbols:add" />
  </Box>
);
export default BtnCreateOrder;
