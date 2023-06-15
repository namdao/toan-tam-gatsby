import React from "react";
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import Iconify from "components/iconify";

import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import OrderDetail from "../OrderDetail";
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import { GridActionsCellItem } from "@mui/x-data-grid";
import "./styles.css";

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

function DialogOrderSelected({
  orderId,
  orderName,
}: {
  orderId: number;
  orderName: string;
}) {
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <GridActionsCellItem
        label="Chi tiết"
        onClick={handleClickOpen}
        icon={<Iconify width={ICON.NAV_ITEM} icon="mdi:show" />}
      />

      <Dialog
        open={open}
        scroll="paper"
        id="order-detail"
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              {translate("orders.orderProcessing.detail", {
                orderId: orderName,
              })}
            </Typography>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 12 }} />
        <OrderDetail orderId={orderId} />
      </Dialog>
    </>
  );
}
export default DialogOrderSelected;
