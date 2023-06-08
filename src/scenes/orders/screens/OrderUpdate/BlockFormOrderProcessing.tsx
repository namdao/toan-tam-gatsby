import { yupResolver } from "@hookform/resolvers/yup";
import {
  alpha,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Stack,
} from "@mui/material";
import { useLocales } from "locales";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IOrderDetail } from "scenes/orders/redux/types";
import * as Yup from "yup";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFNumberFormat,
} from "components/hook-form";
import { parseToNumber } from "utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import { listPayment } from "scenes/orders/helper/OrderConstant";
import { getTotalAmount, getTotalFee } from "utils/utility";
import { useOrderUpdate } from "scenes/orders/hooks/useOrderUpdate";

type IPropsForm = {
  handleClose: (open: boolean) => void;
  orderDetail: IOrderDetail | undefined;
};
type FormValuesProps = {
  payment_method: string;
  deposite: string;
  cod: string;
  note: string;
};
const BlockFormOrderProcessing: FC<IPropsForm> = ({
  handleClose,
  orderDetail,
}) => {
  const { translate } = useLocales();
  const { onUpdateOrder } = useOrderUpdate(orderDetail?.id || -1);
  const OrderUpdateSchema = Yup.object().shape({
    deposite: Yup.string().typeError(
      translate("orders.orderUpdate.error.number")
    ),
    payment_method: Yup.string().required(
      translate("orders.orderUpdate.error.paymentMethod")
    ),
    cod: Yup.string(),
    note: Yup.string().required(translate("orders.orderUpdate.error.notes")),
  });

  const defaultValues = {
    payment_method:
      // convert value from tiền mặt to Tiền mặt
      orderDetail?.payment_method === "tiền mặt"
        ? listPayment[2]
        : orderDetail?.payment_method,
    deposite: orderDetail?.deposite.toString(),
    cod: orderDetail && getTotalAmount(orderDetail).toString(),
    note: "",
    totalAmount: orderDetail && getTotalFee(orderDetail),
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(OrderUpdateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchDeposite = watch("deposite");

  useEffect(() => {
    if (orderDetail && watchDeposite) {
      const restCod = getTotalFee(orderDetail) - parseToNumber(watchDeposite);
      setValue("cod", restCod.toString());
    }
  }, [watchDeposite]);

  const onCallbackSuccess = () => {
    reset();
    handleClose(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    const payload = {
      cod: parseToNumber(data.cod.replaceAll(",", "")),
      note: data.note,
      deposite: parseToNumber(data.deposite.replaceAll(",", "")),
      payment_method: data.payment_method,
    };
    onUpdateOrder(payload, onCallbackSuccess);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <RHFSelect
              name="payment_method"
              label={translate("orders.orderUpdate.form.paymentMethod")}
            >
              {listPayment.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFNumberFormat
              name="totalAmount"
              disabled
              label={translate("orders.orderUpdate.form.amount")}
            />
            <RHFNumberFormat
              name="deposite"
              label={translate("orders.orderUpdate.form.deposite")}
            />
            <RHFNumberFormat
              name="cod"
              label={translate("orders.orderUpdate.form.cod")}
            />
            <RHFTextField
              name="note"
              label={translate("orders.orderUpdate.form.note")}
              multiline
              rows={3}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
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
          {translate("orders.orderUpdate.save")}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
};

export default BlockFormOrderProcessing;
