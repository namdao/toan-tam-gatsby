import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Tab, Tabs, Card } from "@mui/material";
import { ORDER_TAB_WAITING_PRINT } from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import { IOrderTabWaitingPrint } from "scenes/orders/helper/OrderConstant";
import OrderTable from "./OrderTable";
import { ICategoryDefault } from "scenes/categories/redux/types";
import { useOrderPrinted } from "scenes/orders/hooks/useOrderPrinted";

type IMagicTableRef = {
  refreshList: () => void;
};
export const magicTableRef = createRef<IMagicTableRef>();

const tabChild = (tab: IOrderTabWaitingPrint) => {
  const { translate } = useLocales();
  return <Tab key={tab.value} value={tab.value} label={translate(tab.name)} />;
};

const OrderList = () => {
  const [tabSelected, setSelectedTab] = useState<ICategoryDefault>("Card");
  const { onOrderWithCategories, onNextPage, total, orderList, pageModel } =
    useOrderPrinted(tabSelected);
  const onChangeTab = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: ICategoryDefault
  ) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    onOrderWithCategories();
  }, [tabSelected]);

  useImperativeHandle(magicTableRef, () => ({
    refreshList: onOrderWithCategories,
  }));

  return (
    <Card>
      <Tabs
        value={tabSelected}
        onChange={onChangeTab}
        sx={{
          px: 2,
          bgcolor: "background.neutral",
        }}
      >
        {ORDER_TAB_WAITING_PRINT.map((tab) => tabChild(tab))}
      </Tabs>
      <OrderTable
        total={total}
        orderList={orderList}
        onNextPage={onNextPage}
        pageModel={pageModel}
      />
    </Card>
  );
};
export default OrderList;
