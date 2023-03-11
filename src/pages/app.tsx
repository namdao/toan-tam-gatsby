import React, { useEffect } from "react";
import { Router, useLocation } from "@reach/router";
import AuthGuard from "manager/guardManager/AuthGuard";
import navConfig from "layouts/dashboardLayout/nav/config-navigation";
import DashboardLayout from "layouts/dashboardLayout";
import { PATH_APP } from "constant/routeConstant";
import { navigate } from "gatsby";
import { useLocales } from "locales";

const NotFoundTemp = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    console.log(pathname);
    if (pathname === PATH_APP.root) {
      navigate(PATH_APP.statistic.summary);
      return;
    }
    navigate("/404");
  }, []);
  return <></>;
};
const Title = ({ title }: { title: string }): JSX.Element => {
  const { translate } = useLocales();
  return <div>{translate(title)}</div>;
};

const AppPages = () => {
  const listRoute = navConfig.map((e) => e.items);
  return (
    <Router>
      {/* @ts-ignore */}
      <DashboardLayout path={PATH_APP.root}>
        <>
          {/* @ts-ignore */}
          <NotFoundTemp default={true} />
          {listRoute.map((e) => {
            return e.map((x) => {
              const pathNav = x.path;
              let splitPath = pathNav.replace(PATH_APP.root, "");
              if (!splitPath.includes("/")) {
                splitPath = `/${splitPath}`;
              }

              if (x.children) {
                return (
                  <AuthGuard
                    key={pathNav}
                    path={splitPath}
                    component={Title}
                    title={x.title}
                  >
                    {x.children.map((y) => {
                      const subPath = y.path.replace(pathNav, "");
                      return (
                        <AuthGuard
                          key={subPath}
                          path={subPath}
                          component={Title}
                          title={y.title}
                        />
                      );
                    })}
                  </AuthGuard>
                );
              }

              return (
                <AuthGuard
                  key={splitPath}
                  path={splitPath}
                  component={Title}
                  title={x.title}
                />
              );
            });
          })}
        </>
      </DashboardLayout>
    </Router>
  );
};

export default AppPages;
