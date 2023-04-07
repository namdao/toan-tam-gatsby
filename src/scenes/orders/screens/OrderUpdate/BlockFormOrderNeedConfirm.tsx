import { yupResolver } from "@hookform/resolvers/yup";
import {
  alpha,
  DialogActions,
  DialogContent,
  DialogContentText,
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
  RHFRadioGroup,
} from "components/hook-form";
import { parseToNumber } from "utils/formatNumber";
import {
  listConfirmMoney,
  listPayment,
  LIST_MONEY_SOURCE,
} from "scenes/orders/helper/OrderConstant";
import { getTotalAmount, getTotalFee } from "utils/utility";
import { useOrderUpdate } from "scenes/orders/hooks/useOrderUpdate";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import { format, parseISO } from "date-fns";
import { LoadingButton } from "@mui/lab";

type IPropsForm = {
  handleClose: (open: boolean) => void;
  orderDetail: IOrderDetail | undefined;
};
type FormValuesProps = {
  payment_method: string;
  deposite: string;
  cod: string;
  note: string;
  cash: string;
  date_collect_money: Date;
  paymentType: string;
  who_collect_money: string;
  money_source: string;
  done: boolean;
  debt: boolean;
  need_check: boolean;
  company_debit: string;
  confirmed_money: boolean;
};
const BlockFormOrderNeedConfirm: FC<IPropsForm> = ({
  handleClose,
  orderDetail,
}) => {
  const { translate } = useLocales();
  const { onUpdateOrder } = useOrderUpdate(orderDetail?.id || -1);
  const OrderUpdateSchema = Yup.object().shape({
    confirmed_money: Yup.boolean().required(),
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
    paymentType: "",
    // date collect money trả về là getTime
    date_collect_money: orderDetail?.date_collect_money
      ? parseISO(format(orderDetail.date_collect_money * 1000, "yyyy-MM-dd"))
      : new Date(),
    who_collect_money: orderDetail?.who_collect_money,
    money_source: orderDetail?.money_source,
    done: orderDetail?.done,
    debt: orderDetail?.debt,
    need_check: orderDetail?.need_check,
    company_debit: orderDetail?.company_debit,
    confirmed_money: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(OrderUpdateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onCallbackSuccess = () => {
    reset();
    handleClose(false);
  };

  const onSubmit = async (data: FormValuesProps) => {
    const payload = {
      confirmed_money: data.confirmed_money,
      note: "Admin đã xác nhận",
    };
    onUpdateOrder(payload, onCallbackSuccess);
  };

  const isShowWhoCollect =
    LIST_MONEY_SOURCE[
      defaultValues.money_source as keyof typeof LIST_MONEY_SOURCE
    ] === LIST_MONEY_SOURCE.CASH;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <RHFTextField
              disabled
              name="payment_method"
              label={translate("orders.orderUpdate.form.paymentMethod")}
            />
            <RHFNumberFormat
              name="totalAmount"
              disabled
              label={translate("orders.orderUpdate.form.amount")}
            />
            <RHFNumberFormat
              name="deposite"
              disabled
              label={translate("orders.orderUpdate.form.deposite")}
            />
            <RHFNumberFormat
              name="cod"
              disabled
              label={translate("orders.orderUpdate.form.cod")}
            />
            <RHFNumberFormat
              name="cash"
              disabled
              label={translate("orders.orderUpdate.form.cash")}
            />
            <Stack flexDirection="row" justifyContent="space-between">
              <RHFDatePicker
                disabled
                sx={{ minWidth: 400 }}
                name="date_collect_money"
                label={translate("orders.orderUpdate.form.dayCollectMoney")}
              />
              <RHFTextField
                disabled
                sx={{ ml: 3 }}
                name="moneySource"
                label={translate("orders.orderUpdate.form.moneySource")}
              />
            </Stack>
            {isShowWhoCollect && (
              <RHFTextField
                disabled
                name="who_collect_money"
                label={translate("orders.orderUpdate.form.whoCollectionMoney")}
              />
            )}
            <RHFRadioGroup
              row
              name="confirmed_money"
              options={listConfirmMoney}
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

export default BlockFormOrderNeedConfirm;
