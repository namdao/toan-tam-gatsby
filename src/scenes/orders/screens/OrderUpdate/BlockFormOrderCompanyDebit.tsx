import { yupResolver } from "@hookform/resolvers/yup";
import {
  alpha,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Stack,
  Typography,
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
import { fNumber, parseToNumber } from "utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import {
  listPayment,
  LIST_MONEY_SOURCE,
  listPaymentTypeViaCompanyDebit,
  LIST_MONEY_SOURCE_NEW,
} from "scenes/orders/helper/OrderConstant";
import { getTotalAmount, getTotalBasicFee } from "utils/utility";
import { useOrderUpdate } from "scenes/orders/hooks/useOrderUpdate";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import { format, parseISO } from "date-fns";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import { magicTableNeedCollectRef } from "../OrderNeedCollect/OrderList";
import Label from "components/label";

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
};
const BlockFormOrderCompanyDebit: FC<IPropsForm> = ({
  handleClose,
  orderDetail,
}) => {
  const { translate } = useLocales();
  const { onUpdateOrder } = useOrderUpdate(orderDetail?.id || -1);
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
      orderDetail?.payment_method === "tiền mặt"
        ? listPayment[2]
        : orderDetail?.payment_method,
    deposite: orderDetail?.deposite.toString(),
    cod: orderDetail && getTotalAmount(orderDetail).toString(),
    note: "",
    totalAmount: orderDetail && getTotalBasicFee(orderDetail),
    paymentType: "",
    // date collect money trả về là getTime
    date_collect_money: orderDetail?.date_collect_money
      ? parseISO(format(orderDetail.date_collect_money * 1000, "yyyy-MM-dd"))
      : new Date(),
    who_collect_money: orderDetail?.who_collect_money,
    money_source: orderDetail?.money_source || "VIB_PERSON",
    done: orderDetail?.done,
    debt: orderDetail?.debt,
    need_check: orderDetail?.need_check,
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
    if (orderDetail && paymentType) {
      // Đơn đã thu đủ
      if (paymentType === "done") {
        setValue("cash", getTotalAmount(orderDetail).toString());
        setValue("done", true);
        setValue("debt", false);
        setValue("need_check", false);
        // Đơn thu chưa đủ nhưng đã kiểm tra rồi
      } else if (paymentType === "debt") {
        setValue("done", false);
        setValue("debt", true);
        setValue("need_check", false);
      }
    }
  }, [paymentType]);

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

  const onSubmit = async (data: FormValuesProps) => {
    let note = "";
    if (data.done) {
      note = `${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaCompanyDebit[0].label}`;
    } else if (data.debt) {
      note = `${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaCompanyDebit[1].label}`;
    }
    const payload = {
      cod: parseToNumber(data.cod.replaceAll(",", "")),
      note,
      deposite: parseToNumber(data.deposite.replaceAll(",", "")),
      payment_method: data.payment_method,
      cash: parseToNumber(data.cash.replaceAll(",", "")),
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
    onUpdateOrder(payload, onCallbackSuccess);
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
            <RHFNumberFormat
              name="cod"
              disabled
              label={translate("orders.orderUpdate.form.cod")}
            />
            {orderDetail?.cash && (
              <Stack flexDirection="row" alignItems="center">
                <Label variant="soft" color="warning" sx={{ fontSize: 10 }}>
                  Số tiền đã thu được:
                </Label>
                <Typography sx={{ ml: 2 }}>
                  {fNumber(orderDetail?.cash)}
                </Typography>
              </Stack>
            )}
            <RHFNumberFormat
              name="cash"
              label={translate("orders.orderUpdate.form.cash")}
              helperText={
                <Typography variant="caption" color="red">
                  Lưu ý: khi nhập số tiền mới, hệ thống sẽ cập nhật lại số tiền
                  cũ thành mới
                </Typography>
              }
            />

            <RHFRadioGroup
              row
              name="paymentType"
              options={listPaymentTypeViaCompanyDebit}
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

export default BlockFormOrderCompanyDebit;
