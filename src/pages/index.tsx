import React from "react";
import AuthGuard from "manager/guardManager/AuthGuard";
import DashboardApp from "scenes/dashboard/screens/dashboard";

const App = () => {
  return <AuthGuard path={"/"} component={DashboardApp} />;
};

export default App;
