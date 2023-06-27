import React from "react";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { alpha, Card, Grid, Stack } from "@mui/material";
import FormProvider, { RHFTextField } from "components/hook-form";
import { useLocales } from "locales";
import { navigate } from "gatsby";

import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { IOrderDetail } from "../redux/types";
import { LoadingButton } from "@mui/lab";
import { magicOrderProcessingRef } from "../screens/OrderProcessing/OrderTable";
import BlockTimeLine from "../screens/OrderDetail/BlockTimeline";
import { useOrderCreate } from "../hooks/useOrderCreate";

export interface FormOrderValuesProps {
  id: number;
  status: ORDER_STATUS_NAME;
  note: string;
}

type Props = {
  order?: IOrderDetail;
  handleClose?: () => void;
};

const OrderConfirmSchema = Yup.object().shape({
  note: Yup.string().required("Nhập ghi chú"),
});

const resolver: Resolver<FormOrderValuesProps> = async (
  data,
  context,
  options
) => {
  return yupResolver(OrderConfirmSchema)(data, context, options);
};
export default function OrderConfirmDesign({ order, handleClose }: Props) {
  const { translate } = useLocales();
  const { isStatus, quickUpdateOrder } = useOrderCreate();

  const defaultValues = useMemo(
    () => ({
      id: order?.id,
      status: order?.status,
    }),
    [order]
  );

  const methods = useForm<FormOrderValuesProps>({
    resolver,
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isStatus === "success") {
      handleClose && handleClose();
      magicOrderProcessingRef.current?.refreshList();
    }
  }, [isStatus]);

  const onSubmit = async (data: FormOrderValuesProps) => {
    if (data.id) {
      quickUpdateOrder(data);
    }
  };

  const onConfirmDesignOrder = () => {
    setValue("status", ORDER_STATUS_NAME.DESIGNING_AFTER_FEEDBACK);
    handleSubmit(onSubmit)();
  };

  const blockActionButton = () => {
    const actionBtn = {
      title: translate("orders.orderCreate.form.btnConfirmOrder"),
      action: onConfirmDesignOrder,
    };
    return (
      <Card>
        <Stack flexDirection="row" sx={{ px: 3, py: 2 }}>
          <Grid item xs={12} md={4}>
            <RHFTextField
              name="note"
              label={translate("orders.orderCreate.form.notes")}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ alignSelf: "center", pl: 3 }}>
            <Stack flexDirection="row">
              <LoadingButton
                type="button"
                onClick={actionBtn.action}
                size="large"
                variant="contained"
                loading={isSubmitting || isStatus === "loading"}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "grey.800",
                  },
                }}
              >
                {actionBtn.title}
              </LoadingButton>
            </Stack>
          </Grid>
        </Stack>
      </Card>
    );
  };

  const blockTimeLine = () => {
    return <BlockTimeLine data={order} loading={false} />;
  };

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={3} sx={{ p: 4 }}>
        <Grid item xs={12} md={12}>
          {blockTimeLine()}
        </Grid>
        <Grid item xs={12} md={12}>
          {blockActionButton()}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
