import { Card, Divider, Skeleton, Stack, useTheme } from "@mui/material";
import Scrollbar from "components/scrollbar";
import { useLocales } from "locales";
import React, { useEffect } from "react";
import CircleAnalytic from "scenes/orders/components/CircleAnalytic";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { useTotalOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";

const BlockItem = ({
  status,
  color,
  title,
  subTitle,
  icon,
}: {
  status: typeof ORDER_STATUS_NAME;
  color: string;
  title: string;
  subTitle: string;
  icon: string;
}) => {
  const { onOrderWithStatus, loading, totalOrder } =
    useTotalOrderAllStatus(status);
  useEffect(() => {
    onOrderWithStatus();
  }, []);
  if (loading) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 1, minWidth: 200 }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative" }}
        >
          <Skeleton
            sx={{ bgcolor: color, ml: 3 }}
            variant="circular"
            width={56}
            height={56}
          />
        </Stack>
        <Stack spacing={2} sx={{ ml: 3 }}>
          <Skeleton
            sx={{ mt: 1, bgcolor: color }}
            variant="rectangular"
            width={80}
            height={10}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={10}
            sx={{ bgcolor: color }}
          />
        </Stack>
      </Stack>
    );
  }
  return (
    <CircleAnalytic
      title={title}
      subTitle={subTitle}
      total={totalOrder || 0}
      percent={100}
      icon={icon}
      color={color}
    />
  );
};
const BlockSummary = () => {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Card sx={{ mb: 5 }}>
      <Scrollbar>
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderStyle: "dashed" }}
            />
          }
          sx={{ py: 2 }}
        >
          <BlockItem
            title={translate("orders.orderProcessing.designed")}
            subTitle={translate("orders.name")}
            icon="ic:round-receipt"
            color={theme.palette.info.main}
            status={ORDER_STATUS_NAME.DESIGNED}
          />

          <BlockItem
            title={translate("orders.orderProcessing.waitingPrint")}
            subTitle={translate("orders.name")}
            icon="eva:clock-fill"
            color={theme.palette.warning.main}
            status={ORDER_STATUS_NAME.WAITING_PRINT}
          />

          <BlockItem
            title={translate("orders.orderProcessing.printed")}
            subTitle={translate("orders.name")}
            status={ORDER_STATUS_NAME.PRINTED}
            icon="eva:checkmark-circle-2-fill"
            color={theme.palette.success.main}
          />

          <BlockItem
            title={translate("orders.orderProcessing.cancel")}
            subTitle={translate("orders.name")}
            status={ORDER_STATUS_NAME.CANCEL}
            icon="eva:bell-fill"
            color={theme.palette.error.main}
          />

          <BlockItem
            title={translate("orders.orderProcessing.draft")}
            subTitle={translate("orders.name")}
            status={ORDER_STATUS_NAME.DRAFT}
            icon="eva:file-fill"
            color={theme.palette.text.secondary}
          />
        </Stack>
      </Scrollbar>
    </Card>
  );
};
export default BlockSummary;
