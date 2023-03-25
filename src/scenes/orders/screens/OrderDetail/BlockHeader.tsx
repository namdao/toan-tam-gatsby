import React from "react";
import { LoadingButton } from "@mui/lab";
import CustomBreadcrumbs from "components/breadCumbs";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
type IProps = {
  orderId: number;
};
const BlockHeader = ({ orderId }: IProps) => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={translate("orders.orderProcessing.detail", { orderId })}
      links={[
        {
          name: translate("order.title"),
          href: PATH_APP.order.root,
        },
        {
          name: translate("orders.orderProcessing.title"),
          href: PATH_APP.order.processing,
        },
        {
          name: translate("orders.orderProcessing.detail", { orderId }),
        },
      ]}
    />
  );
};
export default BlockHeader;
