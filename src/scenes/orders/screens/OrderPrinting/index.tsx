import React, { useState } from "react";
import { Card, Container, Tab, Tabs } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import OrderList from "./OrderList";
import Helmet from "react-helmet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrderListGroup from "../OrderListGroup/OrderListGroup";
import GroupListByOrder from "../OrderListGroup/GroupListByOrder";
const queryClient = new QueryClient();

const OrderPrinting = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  const [tabsChange, setTabsChange] = useState(1);
  const [tabsChild, setTabsChild] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsChange(newValue);
  };
  const handleChangeChild = (event: React.SyntheticEvent, newValue: number) => {
    setTabsChild(newValue);
  };

  return (
    <>
      <Helmet title={translate("orders.orderPrintingList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <Card>
          <Tabs
            value={tabsChange}
            onChange={handleChange}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {/* <Tab key={0} value={0} label="Tổng đơn đang in" /> */}
            <Tab key={1} value={1} label="Danh sách chờ duyệt bình bài" />
            <Tab key={1} value={2} label="Danh sách bài đang bình" />
          </Tabs>
          {(tabsChange === 1 || tabsChange === 2) && (
            <Tabs
              value={tabsChild}
              onChange={handleChangeChild}
              sx={{
                px: 2,
                bgcolor: "background.neutral",
              }}
            >
              <Tab key={0} value={0} label="Ds bài 1 đơn, bài nhìu đơn" />
              <Tab key={0} value={1} label="Ds đơn nhiều bài" />
            </Tabs>
          )}
          {/* {tabsChange === 0 && <OrderList />} */}
          <Container sx={{ maxWidth: "1920px!important", marginLeft: 0 }}>
            {tabsChange === 1 && tabsChild === 0 && (
              <QueryClientProvider client={queryClient}>
                <OrderListGroup screen="WAITING_APPROVED" />
              </QueryClientProvider>
            )}
            {tabsChange === 1 && tabsChild === 1 && (
              <QueryClientProvider client={queryClient}>
                <GroupListByOrder screen="WAITING_APPROVED" />
              </QueryClientProvider>
            )}
            {tabsChange === 2 && tabsChild === 0 && (
              <QueryClientProvider client={queryClient}>
                <OrderListGroup screen="PRINTING" />
              </QueryClientProvider>
            )}
            {tabsChange === 2 && tabsChild === 1 && (
              <QueryClientProvider client={queryClient}>
                <GroupListByOrder screen="PRINTING" />
              </QueryClientProvider>
            )}
          </Container>
        </Card>
      </Container>
    </>
  );
};
export default OrderPrinting;
