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
import { IOrderDetail, IRequestUpdateOrder } from "scenes/orders/redux/types";
import * as Yup from "yup";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFNumberFormat,
  RHFRadioGroup,
} from "components/hook-form";
import { normalizeToNumber } from "utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import {
  listPayment,
  LIST_MONEY_SOURCE,
  listPaymentTypeViaNeedCollect,
  LIST_MONEY_SOURCE_NEW,
} from "scenes/orders/helper/OrderConstant";
import { getTotalAmount, getTotalBasicFee, getTotalVatFee } from "utils/utility";
import { useOrderUpdate } from "scenes/orders/hooks/useOrderUpdate";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import { format, parseISO } from "date-fns";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import { magicTableNeedCollectRef } from "../OrderNeedCollect/OrderList";
import { useMemo } from "react";
import { apiOrderUpdate } from "scenes/orders/redux/api";
import { useSnackbar } from "notistack";
import { isNumber } from "lodash";

type IPropsForm = {
  handleClose: (open: boolean) => void;
  orderDetail?: IOrderDetail;
  orderDetails?: IOrderDetail[];
};
type FormValuesProps = {
  payment_method: string;
  deposite: string;
  cod: string;
  note: string;
  cash: number | string;
  date_collect_money: Date;
  paymentType: string;
  who_collect_money: string;
  money_source: string;
  done: boolean;
  debt: boolean;
  need_check: boolean;
};
const BlockFormOrderNeedCollect: FC<IPropsForm> = ({
  handleClose,
  orderDetail,
  orderDetails,
}) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const orders = useMemo(() => {
    if (Array.isArray(orderDetails) && orderDetails.length > 0) {
      return orderDetails;
    }
    return orderDetail ? [orderDetail] : [];
  }, [orderDetails, orderDetail]);
  const primaryOrder = orders[0];
  const isMultiOrder = orders.length > 1;
  const { onUpdateOrder } = useOrderUpdate(primaryOrder?.id || -1);
  const user = useAppSelector(AuthSelector.getProfile);
  const OrderUpdateSchema = Yup.object().shape({
    deposite: Yup.string().typeError(
      translate("orders.orderUpdate.error.number")
    ),
    payment_method: Yup.string().required(
      translate("orders.orderUpdate.error.paymentMethod")
    ),
    cod: Yup.string(),
    cash: Yup.string(),
    paymentType: Yup.string().required(
      translate("orders.orderUpdate.error.paymentType")
    ),
    date_collect_money: Yup.date()
      .required()
      .typeError(translate("orders.orderUpdate.error.dateCollectMoney")),
    who_collect_money: Yup.string(),
    money_source: Yup.string().required(
      translate("orders.orderUpdate.error.moneySource")
    ),
    note: Yup.string().required(translate("orders.orderUpdate.error.notes")),
  });

  const defaultValues = {
    payment_method:
      // convert value from tiền mặt to Tiền mặt
      primaryOrder?.payment_method === "tiền mặt"
        ? listPayment[2]
        : primaryOrder?.payment_method,
    deposite: orders
      .reduce((sum, order) => sum + (isNumber(order.deposite) ? order.deposite : 0), 0)
      .toString(),
    cod: orders
      .reduce((sum, order) => sum + (isNumber(order.cod) ? order.cod : 0), 0)
      .toString(),
    cash: primaryOrder && primaryOrder.cash,
    note: "",
    totalAmount: orders.reduce((sum, order) => sum + getTotalBasicFee(order), 0),
    paymentType: "",
    // date collect money trả về là getTime
    date_collect_money: primaryOrder?.date_collect_money
      ? parseISO(format(primaryOrder.date_collect_money * 1000, "yyyy-MM-dd"))
      : new Date(),
    who_collect_money: primaryOrder?.who_collect_money,
    money_source: primaryOrder?.money_source || "VIB_PERSON",
    done: primaryOrder?.done,
    debt: primaryOrder?.debt,
    need_check: primaryOrder?.need_check,
    otherFee: orders
      .reduce((sum, order) => sum + (isNumber(order.other_fee) ? order.other_fee : 0), 0)
      .toString(),
    vatFee:
      orders.length === 1
        ? (primaryOrder?.vat_fee?.toString() || "")
        : "",
    vatFeeNumber: orders
      .reduce((sum, order) => sum + getTotalVatFee(order), 0)
      .toString(),
    discount: orders
      .reduce((sum, order) => sum + (isNumber(order.discount) ? order.discount : 0), 0)
      .toString(),
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

  const [paymentType, money_source] = watch(["paymentType", "money_source"]);
  useEffect(() => {
    if (primaryOrder && paymentType) {
      // Đơn đã thu đủ
      if (paymentType === "done") {
        // In multi-order mode we will set cash per-order on submit.
        setValue("cash", isMultiOrder ? "0" : primaryOrder?.cod?.toString());
        setValue("done", true);
        setValue("debt", false);
        setValue("need_check", false);
        // Đơn thu chưa đủ nhưng đã kiểm tra rồi
      } else if (paymentType === "debt") {
        setValue("done", false);
        setValue("debt", true);
        setValue("need_check", false);
        // Đơn thu khách thực tế đã đủ nhưng nhỏ hơn số tiền phải thu cần kiểm tra lại
      } else if (paymentType === "need_check") {
        setValue("done", false);
        setValue("debt", false);
        setValue("need_check", true);
      }
    }
  }, [paymentType, primaryOrder, isMultiOrder]);

  useEffect(() => {
    if (
      LIST_MONEY_SOURCE[money_source as keyof typeof LIST_MONEY_SOURCE] !==
      LIST_MONEY_SOURCE.CASH
    ) {
      setValue("who_collect_money", "");
    }
  }, [money_source]);

  const onCallbackSuccess = () => {
    reset();
    handleClose(false);
    magicTableNeedCollectRef.current?.onRefreshOrderList();
  };

  type MultiOrderPayloadBase = Omit<
    IRequestUpdateOrder,
    "cod" | "deposite" | "cash" | "code"
  >;

  const updateMultiOrders = async (payloadBase: MultiOrderPayloadBase) => {
    for (const order of orders) {
      const cashValue = payloadBase.done
        ? normalizeToNumber((order.cod || 0).toString())
        : normalizeToNumber((order.cash || 0).toString());
      await apiOrderUpdate(order.id, {
        ...payloadBase,
        cod: normalizeToNumber((order.cod || 0).toString()),
        deposite: normalizeToNumber((order.deposite || 0).toString()),
        cash: cashValue,
      });
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    let note = data.note;
    if (data.done) {
      note += ` (${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaNeedCollect[0].label})`;
    } else if (data.debt) {
      note += ` (${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaNeedCollect[1].label})`;
    } else if (data.need_check) {
      note += ` (${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaNeedCollect[2].label})`;
    }
    const payloadBase = {
      note,
      payment_method: data.payment_method,
      done: data.done,
      debt: data.debt,
      need_check: data.need_check,
      date_collect_money: data.date_collect_money,
      money_source: data.money_source,
      who_collect_money:
        LIST_MONEY_SOURCE[money_source as keyof typeof LIST_MONEY_SOURCE] ===
        LIST_MONEY_SOURCE.CASH
          ? data.who_collect_money
          : "",
    };

    if (!isMultiOrder) {
      const payload = {
        ...payloadBase,
        cod: normalizeToNumber(data?.cod),
        deposite: normalizeToNumber(data?.deposite),
        cash: normalizeToNumber(data?.cash?.toString() || "0"),
      };
      onUpdateOrder(payload, onCallbackSuccess);
      return;
    }

    try {
      await updateMultiOrders(payloadBase);
      enqueueSnackbar(translate("orders.orderUpdate.success.orderProcessing"));
      onCallbackSuccess();
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "updateMultiOrders error", {
        variant: "error",
      });
    }
  };
  const isShowWhoCollect =
    LIST_MONEY_SOURCE[money_source as keyof typeof LIST_MONEY_SOURCE] ===
    LIST_MONEY_SOURCE.CASH;
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
              disabled
              label={translate("orders.orderUpdate.form.deposite")}
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
                disabled
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
              name="otherFee"
              disabled
              label={translate("orders.orderUpdate.form.otherFee")}
            />
            <RHFNumberFormat
              name="discount"
              disabled
              label={translate("orders.orderUpdate.form.discount")}
            />
            <RHFNumberFormat
              name="cod"
              disabled
              label={translate("orders.orderUpdate.form.cod")}
            />
            <RHFRadioGroup
              row
              name="paymentType"
              options={listPaymentTypeViaNeedCollect}
            />
            <Stack flexDirection="row" justifyContent="space-between">
              <RHFDatePicker
                sx={{ minWidth: 400 }}
                name="date_collect_money"
                label={translate("orders.orderUpdate.form.dayCollectMoney")}
              />
              <RHFSelect
                sx={{ ml: 3 }}
                name="money_source"
                label={translate("orders.orderUpdate.form.moneySource")}
              >
                {Object.keys(LIST_MONEY_SOURCE_NEW).map((e) => (
                  <MenuItem key={e} value={e}>
                    {/* @ts-ignore */}
                    {LIST_MONEY_SOURCE_NEW[e]}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
            {isShowWhoCollect && (
              <RHFTextField
                name="who_collect_money"
                label={translate("orders.orderUpdate.form.whoCollectionMoney")}
              />
            )}
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

export default BlockFormOrderNeedCollect;
