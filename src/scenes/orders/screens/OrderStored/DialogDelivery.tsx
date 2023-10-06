import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, {
  createRef,
  FC,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useLocales } from "locales";
import Iconify from "components/iconify";
import FormProvider, {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from "components/hook-form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/system";
import { useOrderDelivery } from "scenes/orders/hooks/useOrderDelivery";
import {
  IReqOrderDelivery,
  IReqUpdateMultiOrder,
} from "scenes/orders/redux/types";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IOrderDeliveryProps = {
  onOpen: (orderIds: number[], isReject?: boolean) => void;
  onClose: () => void;
};

const DELIVER_PARTNER = {
  GRAB: "Grab",
  AHA_MOVE: "Ahamove",
  OTHERS: "others",
  COMPANY_STAFF: "company_staff",
};
interface FormValuesProps {
  note: string;
  deliver_provider: string;
  delivery_others?: string;
  tracking_id?: string;
}
export const magicOrderDeliveryRef = createRef<IOrderDeliveryProps>();
const DeliverySchema = Yup.object().shape({
  note: Yup.string().required("Nhập ghi chú"),
  deliver_provider: Yup.string().required("Chọn đối tác giao hàng"),
});
const DeliveryOrtherSchema = Yup.object().shape({
  note: Yup.string().required("Nhập ghi chú"),
  deliver_provider: Yup.string().required("Chọn đối tác giao hàng"),
  delivery_others: Yup.string().required("Nhập tên người giao hàng"),
});
const resolver: Resolver<FormValuesProps> = async (data, context, options) => {
  if (
    data.deliver_provider === DELIVER_PARTNER.COMPANY_STAFF ||
    data.deliver_provider === DELIVER_PARTNER.OTHERS
  ) {
    return yupResolver(DeliveryOrtherSchema)(data, context, options);
  }
  return yupResolver(DeliverySchema)(data, context, options);
};
type IPropsDelivery = {
  onRefreshList: () => void;
  status: ORDER_STATUS_NAME;
};
const DiaLogDelivery: FC<IPropsDelivery> = ({ onRefreshList, status }) => {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [orderIds, setOrderIds] = useState<number[]>([]);
  useImperativeHandle(magicOrderDeliveryRef, () => ({
    onOpen: handleClickOpen,
    onClose: handleClose,
  }));
  const { onUpdateMultiOrderGeneral, onUpdateMultiOrderDelivery, loading } =
    useOrderDelivery();

  const methods = useForm<FormValuesProps>({
    resolver,
    defaultValues: {
      note: "",
      deliver_provider: DELIVER_PARTNER.GRAB,
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleClickOpen = (data: number[], isReject = false) => {
    setOrderIds(data);
    setOpen(true);
    setIsReject(isReject);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const callbackSubmit = ({ statusSuccess }: { statusSuccess: boolean }) => {
    if (statusSuccess) {
      handleClose();
      onRefreshList();
    }
  };

  const onSubmit = (data: FormValuesProps) => {
    // chuyen sang giao hang
    if (status === ORDER_STATUS_NAME.STORED && !isReject) {
      let deliver_provider = data.deliver_provider;
      if (
        data.deliver_provider === DELIVER_PARTNER.OTHERS ||
        data.deliver_provider === DELIVER_PARTNER.COMPANY_STAFF
      ) {
        deliver_provider = data.delivery_others || "";
      }
      const payload: IReqOrderDelivery = {
        ...data,
        deliver_provider,
        status: ORDER_STATUS_NAME.DELIVER,
      };
      onUpdateMultiOrderDelivery(payload, orderIds, callbackSubmit);
    }
    // huy don
    else if (status === ORDER_STATUS_NAME.STORED && isReject) {
      const payload: IReqUpdateMultiOrder = {
        status: ORDER_STATUS_NAME.CANCEL,
        notes: data.note,
        order_ids: orderIds,
      };
      onUpdateMultiOrderGeneral(payload, callbackSubmit);
      // giao hang khong thanh cong, tra ve kho
    } else if (status === ORDER_STATUS_NAME.DELIVER && isReject) {
      const payload: IReqUpdateMultiOrder = {
        status: ORDER_STATUS_NAME.STORED,
        notes: data.note,
        order_ids: orderIds,
      };
      onUpdateMultiOrderGeneral(payload, callbackSubmit);
    }
  };

  const deliveryProvider = watch("deliver_provider");
  const onShowFormOrder = () => {
    return (
      <Stack spacing={3} sx={{ pt: 2 }}>
        <RHFRadioGroup
          row
          label={translate("orders.orderStore.deliverProvider")}
          name="deliver_provider"
          defaultValue={DELIVER_PARTNER.GRAB}
          options={[
            {
              label: DELIVER_PARTNER.GRAB,
              value: DELIVER_PARTNER.GRAB,
            },
            {
              label: DELIVER_PARTNER.AHA_MOVE,
              value: DELIVER_PARTNER.AHA_MOVE,
            },
            {
              label: translate("orders.orderStore.others"),
              value: DELIVER_PARTNER.OTHERS,
            },
            {
              label: translate("orders.orderStore.companyStaff"),
              value: DELIVER_PARTNER.COMPANY_STAFF,
            },
          ]}
        />

        {(deliveryProvider === DELIVER_PARTNER.COMPANY_STAFF ||
          deliveryProvider === DELIVER_PARTNER.OTHERS) && (
          <RHFTextField
            name="delivery_others"
            label={translate("orders.orderStore.ortherDeliver")}
            error={!!errors.delivery_others}
          />
        )}
        <RHFTextField
          name="tracking_id"
          label={translate("orders.orderStore.trackingId")}
        />
        <RHFTextField
          name="note"
          label={translate("orders.orderStore.noteDeliver")}
        />
      </Stack>
    );
  };

  const onShowRejectFormOrder = () => {
    return (
      <Stack spacing={3} sx={{ pt: 2 }}>
        <RHFTextField
          name="note"
          label={translate("orders.orderStore.noteCancel")}
        />
      </Stack>
    );
  };

  const onShowButtonAction = () => {
    return (
      <DialogActions>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          disabled={loading}
          loading={isSubmitting || loading}
          sx={{
            bgcolor: (theme) =>
              !isReject
                ? alpha(theme.palette.primary.main, 0.8)
                : alpha(theme.palette.error.main, 0.8),
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: (theme) =>
                !isReject
                  ? theme.palette.primary.main
                  : theme.palette.error.main,
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          {!isReject
            ? translate("orders.orderStore.confirmDelivery")
            : status === ORDER_STATUS_NAME.STORED
            ? translate("orders.orderStore.cancel")
            : translate("orders.orderStore.cancelDelivery")}
        </LoadingButton>
      </DialogActions>
    );
  };
  return (
    <Dialog
      open={open}
      scroll="paper"
      fullWidth
      id="order-delivery"
      keepMounted={false}
      maxWidth="lg"
      PaperProps={{
        sx: {
          maxWidth: 1440,
        },
      }}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) =>
            !isReject ? theme.palette.primary.main : theme.palette.error.main,
          color: "white",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
        }}
      >
        {!isReject
          ? translate("orders.orderStore.confirmDelivery")
          : status === ORDER_STATUS_NAME.STORED
          ? translate("orders.orderStore.cancel")
          : translate("orders.orderStore.cancelDelivery")}
        <Iconify icon="eva:close-fill" width={24} onClick={handleClose} />
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers={true}>
          <DialogContentText>
            {!isReject ? onShowFormOrder() : onShowRejectFormOrder()}
          </DialogContentText>
        </DialogContent>
        {onShowButtonAction()}
      </FormProvider>
    </Dialog>
  );
};
export default DiaLogDelivery;
