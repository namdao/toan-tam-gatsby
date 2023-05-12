import React, { useEffect } from "react";
import { Slide, Dialog, DialogTitle } from "@mui/material";
import Iconify from "components/iconify";

import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import { useOrderDetail } from "scenes/orders/hooks/useOrderDetail";
import { BlockUpdateOrderSkeleton } from "scenes/orders/components/BlockOrderDetailSkeleton";
import BlockFormOrderProcessing from "./BlockFormOrderProcessing";
import BlockFormOrderNeedCollect from "./BlockFormOrderNeedCollect";
import BlockFormOrderNeedCheck from "./BlockFormOrderNeedCheck";
import BlockFormOrderNeedConfirm from "./BlockFormOrderNeedConfirm";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import appConstants from "constant/appConstant";
const { ROLES } = appConstants;
const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IPropsOrderUpdate = {
  orderId: number;
  orderName: string;
  fromPage:
    | "ORDER_PROCESSING"
    | "ORDER_NEED_COLLECT"
    | "ORDER_NEED_CHECK"
    | "ORDER_NEED_CONFIRM";
};
const DialogOrderUpdate = ({
  orderId,
  orderName,
  fromPage,
}: IPropsOrderUpdate) => {
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();
  const { loading, orderDetail, onOrderDetail } = useOrderDetail(orderId);
  const roleUser = useAppSelector(AuthSelector.getRolesUser);
  if (
    roleUser[0].name !== ROLES.ACCOUNTANT &&
    roleUser[0].name !== ROLES.ADMIN
  ) {
    return <></>;
  }
  useEffect(() => {
    if (open) onOrderDetail();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onShowFormOrder = () => {
    switch (fromPage) {
      case "ORDER_PROCESSING":
        return (
          <BlockFormOrderProcessing
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
        );
      case "ORDER_NEED_COLLECT":
        return (
          <BlockFormOrderNeedCollect
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
        );
      case "ORDER_NEED_CHECK":
        return (
          <BlockFormOrderNeedCheck
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
        );
      case "ORDER_NEED_CONFIRM":
        return (
          <BlockFormOrderNeedConfirm
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <GridActionsCellItem
        label="Chi tiết"
        onClick={handleClickOpen}
        icon={
          <Iconify
            width={ICON.NAV_ITEM}
            icon="material-symbols:edit-document-outline"
          />
        }
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
        {loading ? <BlockUpdateOrderSkeleton /> : onShowFormOrder()}
      </Dialog>
    </>
  );
};
export default DialogOrderUpdate;
