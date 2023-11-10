import React, { FC, useCallback, useState } from "react";
import {
  GROUP_ORDER_TYPE,
  STATUS_ORDER_GROUP,
} from "scenes/orders/helper/OrderConstant";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  DialogActions,
  Button,
} from "@mui/material";
import { useLocales } from "locales";
import { IReqUpdateOrderPrinted } from "scenes/orders/redux/types";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/system";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import FormProvider, { RHFTextField, RHFUpload } from "components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { magicTablePrintingRef } from "../OrderPrinting/OrderList";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";

type IOrderBtnAccept = {
  idsOrder: number[];
  idGroup: number;
  groupName: string;
  groupType: GROUP_ORDER_TYPE;
  refetch: () => void;
};
export type FormValuesGroupProps = {
  note: string;
  outsource_date: Date;
  filename:
    | (File & {
        preview: string;
      })
    | string
    | null;
};
const OrderBtnDoneGroup: FC<IOrderBtnAccept> = ({
  idsOrder,
  idGroup,
  groupName,
  groupType,
  refetch,
}) => {
  const { onUpdateOrderGroup, onCompleteOrderGroup } = useOrderGroup();
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();
  const OrderUpdateSchema = Yup.object().shape({
    outsource_date: Yup.string().required("Chọn ngày qua gia công"),
    note: Yup.string().required("Nhập ghi chú"),
  });

  const methods = useForm<FormValuesGroupProps>({
    resolver: yupResolver(OrderUpdateSchema),
    defaultValues: {
      outsource_date: new Date(),
      note: "",
    },
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleAcceptOrder = async (data: FormValuesGroupProps) => {
    const isUploadSuccess = await onCompleteOrderGroup(idGroup, data);
    if (isUploadSuccess) {
      const payload: IReqUpdateOrderPrinted = {
        notes: data.note,
        outsource_date: format(
          new Date(data?.outsource_date || ""),
          "yyyy-MM-dd hh:mm:ss"
        ),
        status: STATUS_ORDER_GROUP.PRINTED_GROUP,
        printed_orders: idsOrder,
        group_type: groupType,
      };
      const status = await onUpdateOrderGroup(idGroup, payload);
      if (status) {
        handleClose();
        magicTablePrintingRef.current?.refreshList();
        reset();
        refetch();
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("filename", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue("filename", null);
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
            <RHFUpload
              name="filename"
              maxSize={3145728}
              onDrop={handleDrop}
              onDelete={handleRemoveFile}
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
      <Button variant="contained" onClick={handleClickOpen}>
        {translate("orders.orderPrintingList.btnDoneGroup")}
      </Button>
      <Dialog
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="md"
        onClose={handleClose}
      >
        <DialogTitle>
          {translate("orders.orderProcessing.update", {
            orderId: groupName,
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
export default OrderBtnDoneGroup;
