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
// import OrderDetail from "../OrderDetail";
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import { ICustomer } from "constant/commonType";
import CustomerNewEditForm from "scenes/customer/components/CustomerNewEditForm";
const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IPropsCustomer = {
  customer: ICustomer;
};
function DialogCustomerDetail({ customer }: IPropsCustomer) {
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
      <Iconify
        width={ICON.NAV_ITEM}
        icon="mdi:edit"
        onClick={handleClickOpen}
      />

      <Dialog
        fullScreen
        open={open}
        scroll="paper"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              {translate("customer.customerDetail.title", {
                name: customer.name,
              })}
            </Typography>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 12 }} />
        <CustomerNewEditForm
          isEdit={true}
          customer={customer}
          closeModal={handleClose}
        />
      </Dialog>
    </>
  );
}
export default DialogCustomerDetail;
