import React, { useEffect } from "react";
import {
  Slide,
  Dialog,
  Typography,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import Iconify from "components/iconify";

import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import FormProvider, { RHFSelect, RHFTextField } from "components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { listPayment } from "scenes/orders/helper/OrderConstant";
import { useOrderDetail } from "scenes/orders/hooks/useOrderDetail";
import { BlockUpdateOrderSkeleton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import { fCurrency } from "utils/formatNumber";
import BlockFormAccountUpdate from "./BlockFormAccountUpdate";

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

const DialogOrderUpdate = ({
  orderId,
  orderName,
}: {
  orderId: number;
  orderName: string;
}) => {
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();
  const { loading, orderDetail, onOrderDetail } = useOrderDetail(orderId);

  useEffect(() => {
    if (open) onOrderDetail();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Iconify
        width={ICON.NAV_ITEM}
        icon="material-symbols:edit-document-outline"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          {translate("orders.orderProcessing.update", { orderId: orderName })}
        </DialogTitle>
        {loading ? (
          <BlockUpdateOrderSkeleton />
        ) : (
          <BlockFormAccountUpdate
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
        )}
      </Dialog>
    </>
  );
};
export default DialogOrderUpdate;
