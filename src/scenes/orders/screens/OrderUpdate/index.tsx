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
import BlockFormOrderCompanyDebit from "./BlockFormOrderCompanyDebit";
import OrderNewEditForm from "scenes/orders/components/OrderNewEditForm";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import OrderConfirmDesign from "scenes/orders/components/OrderConfirmDesign";
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
    | "ORDER_NEED_CONFIRM"
    | "ORDER_COMPANY_DEBIT"
    | "ORDER_SEARCH";
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
    roleUser[0].name !== ROLES.ADMIN &&
    roleUser[0].name !== ROLES.SALER
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

  const titleByFromPage =
    fromPage === "ORDER_SEARCH"
      ? translate("orders.orderProcessing.copy", { orderId: orderName })
      : translate("orders.orderProcessing.update", { orderId: orderName });
  const iconByFromPage =
    fromPage === "ORDER_SEARCH"
      ? "fluent:copy-arrow-right-20-regular"
      : "material-symbols:edit-document-outline";
  const onShowOrderByRole = () => {
    if (fromPage === "ORDER_PROCESSING" && orderDetail) {
      const statusOrder = orderDetail?.status;
      switch (statusOrder) {
        case ORDER_STATUS_NAME.DRAFT:
          return (
            <OrderNewEditForm
              isDisable={false}
              order={orderDetail}
              handleClose={handleClose}
            />
          );
        case ORDER_STATUS_NAME.SALE:
          return (
            <OrderNewEditForm
              isDisable={true}
              order={orderDetail}
              handleClose={handleClose}
            />
          );
        case ORDER_STATUS_NAME.WAITING_FEEDBACK:
          return (
            <OrderConfirmDesign order={orderDetail} handleClose={handleClose} />
          );
        default: {
          if (roleUser[0].name === ROLES.SALER) {
            return (
              <OrderNewEditForm
                isDisable={true}
                order={orderDetail}
                handleClose={handleClose}
              />
            );
          } else {
            return onShowFormOrder();
          }
        }
      }
    } else if (fromPage === "ORDER_SEARCH" && orderDetail) {
      return (
        <OrderNewEditForm
          isDisable={false}
          order={orderDetail}
          handleClose={handleClose}
          isCopy={true}
        />
      );
    } else {
      return onShowFormOrder();
    }
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
      case "ORDER_COMPANY_DEBIT": {
        return (
          <BlockFormOrderCompanyDebit
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <>
      <GridActionsCellItem
        label="Chi tiết"
        onClick={handleClickOpen}
        icon={<Iconify width={ICON.NAV_ITEM} icon={iconByFromPage} />}
      />
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>{titleByFromPage}</DialogTitle>
        {loading ? <BlockUpdateOrderSkeleton /> : onShowOrderByRole()}
      </Dialog>
    </>
  );
};
export default DialogOrderUpdate;
