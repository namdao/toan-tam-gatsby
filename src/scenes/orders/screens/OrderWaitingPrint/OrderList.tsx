import React, { useRef } from "react";
import { Card } from "@mui/material";
import OrderTable, { magicTableWaitingRef } from "./OrderTable";
import OrderCreateGroup, { IPropsGroup } from "./OrderCreateGroup";
import { IOrderDetail } from "scenes/orders/redux/types";

const OrderList = () => {
  const btnGroupRef = useRef<IPropsGroup>(null);

  const onSelectOrder = (item: IOrderDetail[]) => {
    btnGroupRef.current?.selectOrderGroup(item);
  };
  const onTabChange = () => btnGroupRef.current?.resetOrderGroup();

  const onRefreshList = () => magicTableWaitingRef.current?.refreshList();

  const onSearching = (search: string) =>
    magicTableWaitingRef.current?.onSearching(search);

  return (
    <Card>
      <OrderCreateGroup
        ref={btnGroupRef}
        onRefreshList={onRefreshList}
        onSearching={onSearching}
      />
      <OrderTable onSelectOrder={onSelectOrder} onTabChange={onTabChange} />
    </Card>
  );
};
export default OrderList;
