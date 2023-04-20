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
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import { IDataTableCategory } from "scenes/categories/redux/types";
const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IPropsCategory = {
  categoryDetail: IDataTableCategory;
};
function DialogCategoryDetail({ categoryDetail }: IPropsCategory) {
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
        icon="material-symbols:edit-outline"
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
              {translate("category.categoryDetail.title", {
                name: categoryDetail.category_name,
              })}
            </Typography>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 12 }} />
        {/* <OrderDetail orderId={orderId} /> */}
      </Dialog>
    </>
  );
}
export default DialogCategoryDetail;
