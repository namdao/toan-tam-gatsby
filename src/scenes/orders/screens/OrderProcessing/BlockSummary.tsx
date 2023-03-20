import { Card, Divider, Skeleton, Stack, useTheme } from "@mui/material";
import Scrollbar from "components/scrollbar";
import { useLocales } from "locales";
import React, { useEffect } from "react";
import BlockTotalSkeleton from "scenes/orders/components/BlockTotalSkeleton";
import CircleAnalytic from "scenes/orders/components/CircleAnalytic";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import { OrdersSelector } from "scenes/orders/redux/slice";
import { useAppSelector } from "store";

const BlockItem = ({
  status,
  color,
  title,
  subTitle,
  icon,
}: {
  status: ORDER_STATUS_NAME;
  color: string;
  title: string;
  subTitle: string;
  icon: string;
}) => {
  const { onOrderWithStatus } = useOrderAllStatus(status);
  const total = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, status)
  );
  const loading = useAppSelector((state) =>
    OrdersSelector.getLoadingByStatus(state, status)
  );
  useEffect(() => {
    onOrderWithStatus();
  }, []);
  if (loading) {
    return <BlockTotalSkeleton color={color} />;
  }
  return (
    <CircleAnalytic
      title={title}
      subTitle={subTitle}
      total={total}
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
