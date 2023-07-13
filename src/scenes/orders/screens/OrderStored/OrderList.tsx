import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs, Card, Stack } from "@mui/material";
import {
  ORDER_STATUS_NAME,
  ORDER_TAB_STORED,
} from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import Label from "components/label";
import { IOrderTabProcessing } from "scenes/orders/helper/OrderConstant";
import { useOrderAllStatus } from "scenes/orders/hooks/useOrderProcessing";
import { useAppDispatch, useAppSelector } from "store";
import { ordersAction, OrdersSelector } from "scenes/orders/redux/slice";
import OrderTable from "./OrderTable";
import BlockFilter from "./BlockFilter";
import { shallowEqual } from "react-redux";
import BlockDeliveryPrint, { IPropsDeliveryPrint } from "./BlockDeliveryPrint";
import { GridRowSelectionModel } from "@mui/x-data-grid";

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
  const dispatch = useAppDispatch();
  const buttonRef = useRef<IPropsDeliveryPrint>(null);
  const [filterStatus, handleFilterStatus] = useState<ORDER_STATUS_NAME>(
    ORDER_STATUS_NAME.STORED
  );

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

  const onHandleBtnDelivery = ({
    isValid,
    listIds,
  }: {
    isValid: boolean;
    listIds?: GridRowSelectionModel;
  }) => {
    if (!isValid) {
      buttonRef?.current?.disablePrintDelivery();
      buttonRef?.current?.disablePrintDeliveryV2();
    } else {
      buttonRef?.current?.enablePrintDelivery();
      buttonRef?.current?.enablePrintDeliveryV2();
      buttonRef?.current?.setListIds(listIds as number[]);
    }
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
        {ORDER_TAB_STORED.map((tab) => tabChild(tab, filterStatus))}
      </Tabs>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2.5, py: 3 }}
      >
        <BlockFilter />
        <BlockDeliveryPrint ref={buttonRef} />
      </Stack>
      <OrderTable
        status={filterStatus}
        callbackBtnPrint={onHandleBtnDelivery}
      />
    </Card>
  );
};
export default OrderList;
