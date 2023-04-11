import { LoadingButton } from "@mui/lab";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React, { useEffect } from "react";
import { useTotalMoneyReceive } from "scenes/orders/hooks/useOrderNeedCollect";
import { fCurrency } from "utils/formatNumber";

const Header = () => {
  const { translate } = useLocales();
  const { loading, moneyReceive, onTotalReceive } = useTotalMoneyReceive();

  useEffect(() => {
    onTotalReceive();
  }, []);
  return (
    <CustomBreadcrumbs
      heading={translate("orders.orderNeedCollect.title")}
      links={[
        {
          name: translate("order.title"),
          href: PATH_APP.order.root,
        },
        {
          name: translate("orders.orderNeedCollect.title"),
        },
      ]}
      action={
        <LoadingButton
          loading={loading}
          variant="outlined"
          size="large"
          startIcon={<Iconify icon="material-symbols:attach-money" />}
        >
          {translate("orders.orderNeedCollect.totalMoneyReceive", {
            money: fCurrency(moneyReceive),
          })}
        </LoadingButton>
      }
    />
  );
};
export default Header;