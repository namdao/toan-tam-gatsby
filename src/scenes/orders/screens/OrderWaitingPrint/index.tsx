import React, { useMemo, useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import OrderList from "./OrderList";
import Helmet from "react-helmet";
import { useLocation } from "@reach/router";

const WAITING_PRINT_TYPE_TABS = [
  { value: "kts", label: "KTS" },
  { value: "offset", label: "Offset" },
  { value: "khac", label: "Khác" },
] as const;

const OrderWaitingPrint = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();

  const location = useLocation();
  const initialTab = useMemo(() => {
    if (location.pathname.includes("/offset")) return "offset";
    if (location.pathname.includes("/khac")) return "khac";
    return "kts";
  }, [location.pathname]);
  const [printTypeName, setPrintTypeName] = useState<"kts" | "offset" | "khac">(
    initialTab
  );

  return (
    <>
      <Helmet title={translate("orders.orderWaitingPrintList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <Tabs
          value={printTypeName}
          onChange={(_event, value) => setPrintTypeName(value)}
          sx={{ mb: 2 }}
        >
          {WAITING_PRINT_TYPE_TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
        <OrderList printTypeName={printTypeName} />
      </Container>
    </>
  );
};
export default OrderWaitingPrint;
