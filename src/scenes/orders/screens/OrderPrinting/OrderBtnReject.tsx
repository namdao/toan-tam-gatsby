import React, { FC, useState } from "react";
import { useOrderPrinting } from "scenes/orders/hooks/useOrderPrinting";
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
import FormProvider, { RHFTextField } from "components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type IOrderBtnReject = {
  order: IOrderDetail;
};
type FormValuesProps = {
  note: string;
  outsource_date: Date | null;
};
const OrderBtnReject: FC<IOrderBtnReject> = ({ order }) => {
  const { onRejectOrder, loading } = useOrderPrinting();
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();
  const OrderUpdateSchema = Yup.object().shape({
    note: Yup.string().required("Nhập lí do từ chối"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(OrderUpdateSchema),
    defaultValues: {
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
      reason: data.note,
    };
    const status = await onRejectOrder(order.id, payload);
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
            <RHFTextField
              name="note"
              label={translate("orders.orderPrintingList.noteReject")}
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
        label="Từ chối đơn"
        onClick={handleClickOpen}
        icon={
          <Iconify
            width={ICON.NAV_ITEM}
            color="red"
            icon="mdi:cancel-circle-outline"
          />
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
              loading={isSubmitting || loading}
              size="large"
              type="submit"
              variant="contained"
              sx={{
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.8),
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                  bgcolor: (theme) => theme.palette.error.main,
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
export default OrderBtnReject;
