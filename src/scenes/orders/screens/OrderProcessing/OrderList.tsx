import React, { useEffect, useState } from "react";
import { Tab, Tabs, Card } from "@mui/material";
import {
  ORDER_STATUS_NAME,
  ORDER_TAB_PROCESSING,
} from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import Label from "components/label";
import { IOrderTabProcessing } from "scenes/orders/helper/OrderConstant";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";
import OrderTable from "./OrderTable";
import BlockFilter from "./BlockFilter";
import BlockDescription from "./BlockDescription";
import { shallowEqual } from "react-redux";

const tabChild = (
  tab: IOrderTabProcessing,
  filterStatus: ORDER_STATUS_NAME
) => {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector(
    OrdersSelector.getFilterOrder,
    shallowEqual
  );
  const { onOrderWithStatus } = useOrderAllStatus(tab.value);
  const total = useAppSelector((state) =>
    OrdersSelector.getTotalByStatus(state, tab.value)
  );
  useEffect(() => {
    onOrderWithStatus();
    dispatch(ordersAction.resetPagination());
  }, [
    filterStatus,
    dataFilter.createDate,
    dataFilter.search,
    dataFilter.type,
    dataFilter.updateDate,
  ]);
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

  const onChangeStatus = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: ORDER_STATUS_NAME
  ) => {
    handleFilterStatus(newValue);
  };

  return (
    <Card>
      <BlockDescription />
      <Tabs
        value={filterStatus}
        onChange={onChangeStatus}
        sx={{
          px: 2,
          bgcolor: "background.neutral",
        }}
      >
        {ORDER_TAB_PROCESSING.map((tab) => tabChild(tab, filterStatus))}
      </Tabs>
      <BlockFilter status={filterStatus} />
      <OrderTable status={filterStatus} />
    </Card>
  );
};
export default OrderList;
