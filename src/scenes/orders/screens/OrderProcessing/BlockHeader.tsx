import { LoadingButton } from "@mui/lab";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React, { useEffect } from "react";
import { useTotalMoneyProgress } from "scenes/orders/hooks/useOrderProcessing";
import { fCurrency } from "utils/formatNumber";

const Header = () => {
  const { translate } = useLocales();
  const { loading, onTotalProcess, moneyDebitProgress } =
    useTotalMoneyProgress();

  useEffect(() => {
    console.log("onTotalProcess");
    onTotalProcess();
  }, []);
  return (
    <CustomBreadcrumbs
      heading={translate("orders.orderProcessing.title")}
      links={[
        {
          name: translate("order.title"),
          href: PATH_APP.order.root,
        },
        {
          name: translate("orders.orderProcessing.title"),
        },
      ]}
      action={
        <LoadingButton
          loading={loading}
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:attach-money" />}
        >
          {translate("orders.orderProcessing.totalDebit", {
            money: fCurrency(moneyDebitProgress),
          })}
        </LoadingButton>
      }
    />
  );
};
export default Header;
