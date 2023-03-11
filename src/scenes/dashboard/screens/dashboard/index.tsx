import React from "react";
import DashboardLayout from "layouts/dashboardLayout";
import { useLocales } from "locales";

const DashboardScreen = () => {
  const { translate } = useLocales();
  return (
    <DashboardLayout>
      <h1>{translate("docs.hi")}</h1>
    </DashboardLayout>
  );
};
export default DashboardScreen;
