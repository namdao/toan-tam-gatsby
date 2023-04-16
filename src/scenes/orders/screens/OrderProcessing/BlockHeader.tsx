import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Counter from "components/animate/counter";
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
          <Box component="span">
            <Counter from={0} to={moneyDebitProgress} />
            {` VNĐ`}
          </Box>
        </LoadingButton>
      }
    />
  );
};
export default Header;
