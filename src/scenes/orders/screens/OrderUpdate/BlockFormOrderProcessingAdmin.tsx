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
import { normalizeToNumber, parseToNumber } from "utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import { listPayment } from "scenes/orders/helper/OrderConstant";
import {
  getTotalAmount,
  getTotalBasicFee,
  getTotalVatFee,
} from "utils/utility";
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
  otherFee: string;
  vatFee: string;
  discount: string;
  vatFeeNumber: string;
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
    otherFee: Yup.string().typeError(
      translate("orders.orderUpdate.error.number")
    ),
    vatFee: Yup.string().typeError(
      translate("orders.orderUpdate.error.number")
    ),
    discount: Yup.string().typeError(
      translate("orders.orderUpdate.error.number")
    ),
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
    otherFee: orderDetail?.other_fee?.toString() || "",
    vatFee: orderDetail?.vat_fee?.toString() || "",
    vatFeeNumber: getTotalVatFee(orderDetail || ({} as IOrderDetail)).toString() || "",
    discount: orderDetail?.discount?.toString() || "",
    totalAmount: orderDetail && getTotalBasicFee(orderDetail),
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
  const watchOtherFee = watch("otherFee");
  const watchDiscount = watch("discount");
  const watchVatFee = watch("vatFee");

  useEffect(() => {
    if (orderDetail && (watchDeposite || watchOtherFee || watchDiscount || watchVatFee)) {
      const vatFee =
        (getTotalBasicFee(orderDetail) +
        normalizeToNumber(watchOtherFee) -
        normalizeToNumber(watchDiscount)) *
        normalizeToNumber(watchVatFee)/ 100;
      setValue("vatFeeNumber", vatFee.toString());
      const restCod =
        getTotalBasicFee(orderDetail) +
        normalizeToNumber(watchOtherFee) +
        vatFee -
        normalizeToNumber(watchDeposite) -
        normalizeToNumber(watchDiscount);

      setValue("cod", restCod.toString());
    }
  }, [watchDeposite, watchOtherFee, watchDiscount, watchVatFee]);

  const onCallbackSuccess = () => {
    reset();
    handleClose(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    const payload = {
      cod: parseToNumber(data?.cod?.replaceAll(",", "")),
      note: data.note,
      deposite: parseToNumber(data?.deposite?.replaceAll(",", "")),
      payment_method: data.payment_method,
      other_fee: parseToNumber(data?.otherFee?.replaceAll(",", "")),
      vat_fee: parseToNumber(data?.vatFee?.replaceAll(",", "")),
      discount: parseToNumber(data?.discount?.replaceAll(",", "")),
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
              name="otherFee"
              label={translate("orders.orderUpdate.form.otherFee")}
            />
            <RHFNumberFormat
              name="discount"
              label={translate("orders.orderUpdate.form.discount")}
            />
            <Stack flexDirection="row">
              <RHFTextField
                name="vatFee"
                type="number"
                InputProps={{
                  inputProps: {
                    max: 30,
                    min: 0,
                  },
                }}
                sx={{ width: "20%" }}
                label={translate("orders.orderUpdate.form.vatFee")}
              />
              <RHFNumberFormat
                name="vatFeeNumber"
                disabled
                sx={{ ml: 3, width: "50%" }}
                label={translate("orders.orderUpdate.form.vatFeeNumber")}
              />
            </Stack>
            <RHFNumberFormat
              name="cod"
              disabled
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
