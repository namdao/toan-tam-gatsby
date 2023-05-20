import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React, { FC } from "react";

type IProps = {
  title: string;
  dateFrom: string;
  dateTo: string;
};
const Header: FC<IProps> = ({ title, dateFrom, dateTo }) => {
  const { translate } = useLocales();

  const titleHeader = `${translate(
    "statistic.revenueCompanyDetail.title"
  )} ${title} thời gian từ ${dateFrom} đến ${dateTo} `;
  return (
    <CustomBreadcrumbs
      heading={titleHeader}
      links={[
        {
          name: translate("statistic.customer"),
          href: PATH_APP.statistic.customer,
        },
        {
          name: `${translate("statistic.revenueCompanyDetail.title")} ${title}`,
        },
      ]}
    />
  );
};
export default Header;
