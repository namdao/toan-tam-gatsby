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
import { fNumber, normalizeToNumber, parseToNumber } from "utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import {
  listPayment,
  LIST_MONEY_SOURCE,
  listPaymentTypeViaCompanyDebit,
  LIST_MONEY_SOURCE_NEW,
} from "scenes/orders/helper/OrderConstant";
import { getResCod, getTotalAmount, getTotalBasicFee, getTotalVatFee } from "utils/utility";
import { useOrderUpdate } from "scenes/orders/hooks/useOrderUpdate";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import { format, parseISO } from "date-fns";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import { magicTableNeedCollectRef } from "../OrderNeedCollect/OrderList";
import Label from "components/label";
import { magicTableDebitCompanyDetailRef } from "scenes/statistic/screens/DebitCompanyDetail/TableListDebitDetail";

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
  otherFee: string;
  vatFee: string;
  discount: string;
  vatFeeNumber: string;
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
    cod: orderDetail?.cod.toString(),
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
    otherFee: orderDetail?.other_fee?.toString() || "",
    vatFee: orderDetail?.vat_fee?.toString() || "",
    vatFeeNumber: getTotalVatFee(orderDetail || ({} as IOrderDetail)).toString() || "",
    discount: orderDetail?.discount?.toString() || "",
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
    getValues
  } = methods;

  const [paymentType, money_source] = watch(["paymentType", "money_source"]);
  const watchDeposite = watch("deposite");
  const watchOtherFee = watch("otherFee");
  const watchDiscount = watch("discount");
  const watchVatFee = watch("vatFee");

  useEffect(() => {
    if (orderDetail && paymentType) {
      // Đơn đã thu đủ
      if (paymentType === "done") {
        setValue("cash", getValues("cod"));
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
    if (orderDetail && (watchDeposite || watchOtherFee || watchDiscount || watchVatFee)) {
      const vatFee =
        (getTotalBasicFee(orderDetail) +
        normalizeToNumber(watchOtherFee) -
        normalizeToNumber(watchDiscount)) *
        normalizeToNumber(watchVatFee)/ 100;
      setValue("vatFeeNumber", vatFee.toString());
      const restCod = getResCod(
         orderDetail,
         normalizeToNumber(watchOtherFee), 
         normalizeToNumber(watchDeposite), 
         normalizeToNumber(watchDiscount), 
         vatFee,
         normalizeToNumber(orderDetail?.cash.toString())
      );
      setValue("cod", restCod.toString());
    }
  }, [watchDeposite, watchOtherFee, watchDiscount, watchVatFee]);

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
    magicTableDebitCompanyDetailRef.current?.onRefreshOrderList();
  };

  const onSubmit = async (data: FormValuesProps) => {
    let note = "";
    if (data.done) {
      note = `${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaCompanyDebit[0].label}`;
    } else if (data.debt) {
      note = `${user.firstName} ${user.lastName} đã xác nhận là ${listPaymentTypeViaCompanyDebit[1].label}`;
    }
    const orderDetailCash = orderDetail?.cash || 0
    const dataCash = data?.cash ? parseToNumber(data.cash?.replaceAll(",", "")) : 0
    // tổng tiền đã thu + tiền mới nhập
    const currentCash = dataCash + orderDetailCash
    // số tiền đã được tính toán lại ra giá trị cuối cùng
    const currentCod = parseToNumber(data.cod.replaceAll(",", ""))
    // tổng tiền còn lại
    // chỉ trừ lại cod nếu có nhập cash > 0, ngược lại giữ nguyên cod cũ
    const totalCod = dataCash > 0 ? currentCod - dataCash : currentCod
    const payload = {
      cod: totalCod,
      note,
      deposite: parseToNumber(data.deposite.replaceAll(",", "")),
      payment_method: data.payment_method,
      cash: currentCash,
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
      other_fee: parseToNumber(data?.otherFee?.replaceAll(",", "")),
      vat_fee: parseToNumber(data?.vatFee?.replaceAll(",", "")),
      discount: parseToNumber(data?.discount?.replaceAll(",", "")),
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
            <Stack flexDirection="row" alignItems="center">
              <Label variant="soft" color="warning" sx={{ fontSize: 10 }}>
                Số tiền đã thu được:
              </Label>
              <Typography variant="h6" sx={{ ml: 2 }}>
                {fNumber(orderDetail?.cash || 0)}
              </Typography>
            </Stack>
            <RHFNumberFormat
              name="cash"
              label={translate("orders.orderUpdate.form.cash")}
              helperText={
                <Typography variant="caption" color="red">
                  Lưuý: khi nhập số tiền mới, hệ thống sẽ 
                  <span style={{ fontWeight: "bold", fontSize: 14 }}> CỘNG DỒN </span>
                  số tiền hiện có và số tiền nhập vào thành số tiền mới
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
