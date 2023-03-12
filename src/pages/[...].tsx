import React, { useEffect } from "react";
import { Router, useLocation, Location } from "@reach/router";
import AuthGuard from "manager/guardManager/AuthGuard";
import navConfig from "constant/navConstant";
import DashboardLayout from "layouts/dashboardLayout";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";

const NotFoundTemp = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    console.log(pathname);
    if (pathname === "/") {
      navigate(PATH_APP.order.processing);
      return;
    }
    navigate("/404");
  }, []);
  return <></>;
};
const Title = ({ title, ...rest }: { title: string }): JSX.Element => {
  const { translate } = useLocales();
  return <div>{translate(title)}</div>;
};

const AppPages = () => {
  const listRoutingApp = () => {
    const listRoute = navConfig.map((e) => e.items);
    return listRoute.map((e) => {
      return e.map((x) => {
        const pathNav = x.path;
        const component = x?.component || Title;
        if (x.children) {
          return (
            <AuthGuard
              key={pathNav}
              path={pathNav}
              component={component}
              title={x.title}
            >
              {x.children.map((y) => {
                const subPath = y.path.replace(pathNav, "");
                const subComponent = y?.component || Title;
                return (
                  <AuthGuard
                    key={subPath}
                    path={subPath}
                    component={subComponent}
                    title={y.title}
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
            component={component}
            title={x.title}
          />
        );
      });
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
