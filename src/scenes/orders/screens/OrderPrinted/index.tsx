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

const OrderPrinted = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  const [tabsChange, setTabsChange] = useState(0);
  const [tabsChild, setTabsChild] = useState(0);
  const queryClient = new QueryClient();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabsChange(newValue);
  };
  const handleChangeChild = (event: React.SyntheticEvent, newValue: number) => {
    setTabsChild(newValue);
  };
  return (
    <>
      <Helmet title={translate("orders.orderPrinted.title")} />
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
            <Tab key={0} value={0} label="Tổng đơn đã in" />
            <Tab key={1} value={1} label="Danh sách bài đã in" />
          </Tabs>
          {tabsChange === 1 && (
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
          {tabsChange === 0 && <OrderList />}
          <Container sx={{ maxWidth: "1920px!important", marginLeft: 0 }}>
            {tabsChange === 1 && tabsChild === 0 && (
              <QueryClientProvider client={queryClient}>
                <OrderListGroup screen="PRINTED" />
              </QueryClientProvider>
            )}
            {tabsChange === 1 && tabsChild === 1 && (
              <QueryClientProvider client={queryClient}>
                <GroupListByOrder screen="PRINTED" />
              </QueryClientProvider>
            )}
          </Container>
          {/* {tabsChange === 1 && (
            <Container sx={{ maxWidth: "1920px!important", marginLeft: 0 }}>
              <QueryClientProvider client={queryClient}>
                <OrderListGroup screen="PRINTED" />
              </QueryClientProvider>
            </Container>
          )} */}
        </Card>
      </Container>
    </>
  );
};
export default OrderPrinted;
