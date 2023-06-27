import React, { useEffect, useState } from "react";
import { Tab, Tabs, Card } from "@mui/material";
import {
  ORDER_STATUS_NAME,
  ORDER_TAB_PROCESSING,
  ORDER_TAB_PROCESSING_FOR_SALE,
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
import { AuthSelector } from "scenes/auth/redux/slice";
import { ROLES } from "scenes/users/helper/RoleConstants";

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
    setTimeout(() => {
      onOrderWithStatus();
    }, 100);
    dispatch(ordersAction.resetPagination());
  }, [
    filterStatus,
    dataFilter.createDate,
    dataFilter.search,
    dataFilter.type,
    dataFilter.updateDate,
    dataFilter.customer_id,
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
  const dispatch = useAppDispatch();
  const roleUser = useAppSelector(AuthSelector.getRolesUser);
  useEffect(() => {
    return () => {
      dispatch(ordersAction.resetFilter());
    };
  }, []);

  const onChangeStatus = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: ORDER_STATUS_NAME
  ) => {
    handleFilterStatus(newValue);
  };

  const TAB_BY_ROLES =
    roleUser[0].name === ROLES.Admin || roleUser[0].name === ROLES.Saler
      ? ORDER_TAB_PROCESSING_FOR_SALE
      : ORDER_TAB_PROCESSING;
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
        {TAB_BY_ROLES.map((tab) => tabChild(tab, filterStatus))}
      </Tabs>
      <BlockFilter />
      <OrderTable status={filterStatus} />
    </Card>
  );
};
export default OrderList;
