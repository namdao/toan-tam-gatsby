import React, { FC, useEffect, useState } from "react";
import { STATUS_ORDER_GROUP } from "scenes/orders/helper/OrderConstant";
import Chip from "@mui/material/Chip";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  DialogActions,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { useLocales } from "locales";
import {
  IOrderDetail,
  IOrderGroup,
  IReqUpdateOrderPrinted,
} from "scenes/orders/redux/types";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/system";
import OrderListWaitingTable from "scenes/orders/screens/OrderWaitingPrint/OrderTable";
import { magicTablePrintingRef } from "../OrderPrinting/OrderList";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";

type IOrderBtnUpdate = {
  item: IOrderGroup;
  refetch: () => void;
};
const OrderBtnUpdateGroup: FC<IOrderBtnUpdate> = ({ item, refetch }) => {
  const { onUpdateOrderGroup, loading } = useOrderGroup();
  const [open, setOpen] = useState(false);
  const [listOrderGroup, setListOrderGroup] = useState<IOrderDetail[]>([]);
  const { translate } = useLocales();

  const handleUpdateOrderGroup = async () => {
    const mergeList = listOrderGroup.map((e) => e.id);
    const payload: IReqUpdateOrderPrinted = {
      order_ids: mergeList,
      status: STATUS_ORDER_GROUP.WAITING_APPROVED,
    };
    const status = await onUpdateOrderGroup(item.id, payload);
    if (status) {
      handleClose();
      magicTablePrintingRef.current?.refreshList();
      refetch();
    }
  };

  useEffect(() => {
    setListOrderGroup(item.orders);
  }, [item.orders]);

  const handleClose = () => {
    setOpen(false);
    setListOrderGroup(item.orders);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteOrder = (idDelete: number) => () => {
    setListOrderGroup((list) => list.filter((e) => e.id !== idDelete));
  };

  const onAddMoreOrder = (val: IOrderDetail[]) => {
    setListOrderGroup(val);
  };

  const onShowListOrder = () => {
    return (
      <DialogContent>
        <DialogContentText>
          <Typography variant="subtitle1">
            Danh sách đơn hàng hiện tại
          </Typography>
          <Stack flexDirection={"row"} sx={{ py: 1, flexWrap: "wrap" }}>
            {listOrderGroup.map((e) => {
              return (
                <Chip
                  color="success"
                  label={e.order_no}
                  sx={{ mr: 1, mb: 1 }}
                  onDelete={handleDeleteOrder(e.id)}
                />
              );
            })}
          </Stack>
          <Typography variant="subtitle1" sx={{}}>
            Danh sách đơn hàng chờ in
          </Typography>
          <Card>
            <OrderListWaitingTable
              onSelectOrder={onAddMoreOrder}
              listTotalSelection={listOrderGroup}
            />
          </Card>
        </DialogContentText>
      </DialogContent>
    );
  };

  return (
    <>
      <Button variant="contained" color="info" onClick={handleClickOpen}>
        {translate("orders.orderPrintingList.btnUpdateGroup")}
      </Button>
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="md"
        onClose={handleClose}
      >
        <DialogTitle>{`Cập nhật bài ${item.group_name}`}</DialogTitle>
        {onShowListOrder()}
        <DialogActions>
          <LoadingButton
            onClick={handleUpdateOrderGroup}
            loading={loading}
            disabled={listOrderGroup.length < 1}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            {translate("orders.orderPrintingList.btnUpdateGroup")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default OrderBtnUpdateGroup;
