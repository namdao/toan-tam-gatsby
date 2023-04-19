import React, { FC } from "react";
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

import { forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useLocales } from "locales";
import UserNewEditForm from "../../components/UserNewEditForm";
import { IResUser } from "scenes/users/redux/types";

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IPropsDialog = {
  currentUser: IResUser;
  open: boolean;
  handleClose: () => void;
  onGetUserList: () => void;
};
const DialogUserUpdateSelect: FC<IPropsDialog> = ({
  currentUser,
  open,
  handleClose,
  onGetUserList,
}) => {
  const { translate } = useLocales();

  return (
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
            {translate("users.userUpdate.title")}
          </Typography>
          <IconButton color="inherit" edge="start" onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 12 }} />
      <UserNewEditForm
        currentUser={currentUser}
        isEdit={true}
        closeModal={handleClose}
        onGetUserList={onGetUserList}
      />
    </Dialog>
  );
};
export default DialogUserUpdateSelect;
