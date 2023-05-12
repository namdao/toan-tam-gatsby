import React, { FC, useState } from "react";
import { useOrderPrinting } from "scenes/orders/hooks/useOrderPrinting";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { magicTableRef } from "./OrderList";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  DialogActions,
} from "@mui/material";
import { useLocales } from "locales";
import { IOrderDetail } from "scenes/orders/redux/types";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/system";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import FormProvider, { RHFTextField } from "components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";

type IOrderBtnAccept = {
  order: IOrderDetail;
};
type FormValuesProps = {
  note: string;
  outsource_date: Date;
};
const OrderBtnDone: FC<IOrderBtnAccept> = ({ order }) => {
  const { onFinishOrder } = useOrderPrinting();
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();
  const OrderUpdateSchema = Yup.object().shape({
    outsource_date: Yup.string().required("Chọn ngày qua gia công"),
    note: Yup.string().required("Nhập ghi chú"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(OrderUpdateSchema),
    defaultValues: {
      outsource_date: new Date(),
      note: "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleAcceptOrder = async (data: FormValuesProps) => {
    const payload = {
      note: data.note,
      outsource_date: format(
        new Date(data?.outsource_date || ""),
        "yyyy-MM-dd hh:mm:ss"
      ),
      status: ORDER_STATUS_NAME.PRINTED,
    };
    const status = await onFinishOrder(order.id, payload);
    if (status) {
      handleClose();
      magicTableRef.current?.refreshList();
      reset();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onShowFormOrder = () => {
    return (
      <DialogContent>
        <DialogContentText>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <RHFDatePicker
              sx={{ minWidth: 400 }}
              name="outsource_date"
              label={translate("orders.orderPrintingList.outsourceDate")}
            />
            <RHFTextField
              name="note"
              label={translate("orders.orderUpdate.form.note")}
              multiline
              maxRows={3}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
    );
  };

  return (
    <>
      <GridActionsCellItem
        label="Xác nhận đơn"
        onClick={handleClickOpen}
        icon={
          <Iconify width={ICON.NAV_ITEM} color="green" icon="el:ok-circle" />
        }
      />
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="md"
        onClose={handleClose}
      >
        <DialogTitle>
          {translate("orders.orderProcessing.update", {
            orderId: order.order_no,
          })}
        </DialogTitle>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(handleAcceptOrder)}
        >
          {onShowFormOrder()}
          <DialogActions>
            <LoadingButton
              fullWidth
              loading={isSubmitting}
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
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              {translate("orders.orderPrintingList.done")}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};
export default OrderBtnDone;
