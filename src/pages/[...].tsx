import React, { useEffect } from "react";
import { Router, useLocation, Location } from "@reach/router";
import AuthGuard from "manager/guardManager/AuthGuard";
import DashboardLayout from "layouts/dashboardLayout";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import { listPermissionRoutingByRole } from "utils/utility";

const NotFoundTemp = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/") {
      navigate(PATH_APP.order.processing);
      return;
    }
    navigate("/404");
  }, []);
  return <></>;
};

const AppPages = () => {
  const roles = useAppSelector(AuthSelector.getRolesUser)[0]?.name;
  const listRoutingApp = () => {
    const listRoute = listPermissionRoutingByRole(roles);
    return listRoute.map((e) => {
      const pathNav = e.path;
      if (e.children.length >= 1) {
        return (
          <AuthGuard
            key={pathNav}
            path={pathNav}
            component={e.component}
            roles={e.roles}
          >
            {e.children.map((child) => {
              const subPath = child.path.replace(pathNav, "");
              const subComponent = child?.component;
              return (
                <AuthGuard
                  key={subPath}
                  path={subPath}
                  component={subComponent}
                  roles={e.roles}
                />
              );
            })}
          </AuthGuard>
        );
      }
      return (
        <AuthGuard
          key={pathNav}
          path={pathNav}
          component={e.component}
          roles={e.roles}
        />
      );
    });
  };
  return (
    <Location>
      {({ location }) => (
        <DashboardLayout>
          <Router location={location}>
            {/* @ts-ignore */}
            <NotFoundTemp default={true} />
            {listRoutingApp()}
          </Router>
        </DashboardLayout>
      )}
    </Location>
  );
};

export default AppPages;
