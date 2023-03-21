import React, { FC, useEffect, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from "@mui/material";
import {
  ORDER_STATUS_NAME,
  ORDER_TAB_PROCESSING,
} from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import Label from "components/label";
import { IOrderTabProcessing } from "scenes/orders/helper/OrderConstant";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import { useAppSelector } from "store";
import { OrdersSelector } from "scenes/orders/redux/slice";
import OrderTable from "./OrderTable";
import BlockFilter from "./BlockFilter";

const tabChild = (
  tab: IOrderTabProcessing,
  filterStatus: ORDER_STATUS_NAME
) => {
  const { translate } = useLocales();
  const { onOrderWithStatus } = useOrderAllStatus(tab.value);
  const total = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, tab.value)
  );
  useEffect(() => {
    if (filterStatus === tab.value) {
      onOrderWithStatus();
    }
  }, [filterStatus]);
  return (
    <Tab
      key={tab.value}
      value={tab.value}
      label={translate(tab.name)}
      icon={
        <Label color={tab.color} sx={{ mr: 1 }}>
          {total}
        </Label>
      }
    />
  );
};
const OrderList = () => {
  const [filterStatus, handleFilterStatus] = useState<ORDER_STATUS_NAME>(
    ORDER_STATUS_NAME.DESIGNED
  );

  useEffect(() => {}, [filterStatus]);

  const onChangeStatus = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: ORDER_STATUS_NAME
  ) => {
    handleFilterStatus(newValue);
  };

  return (
    <Card>
      <Tabs
        value={filterStatus}
        onChange={onChangeStatus}
        sx={{
          px: 2,
          bgcolor: "background.neutral",
        }}
      >
        {ORDER_TAB_PROCESSING.map((tab) => {
          return tabChild(tab, filterStatus);
        })}
      </Tabs>
      <BlockFilter />
      <OrderTable status={filterStatus} />
    </Card>
  );
};
export default OrderList;
