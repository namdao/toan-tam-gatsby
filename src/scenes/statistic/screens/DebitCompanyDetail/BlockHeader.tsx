import CustomBreadcrumbs from "components/breadCumbs";
import { PATH_APP } from "constant/routeConstant";
import { useLocales } from "locales";
import React, { FC } from "react";

type IProps = {
  title: string;
};
const Header: FC<IProps> = ({ title }) => {
  const { translate } = useLocales();
  return (
    <CustomBreadcrumbs
      heading={`${translate("statistic.debitCompanyDetail.title")} ${title}`}
      links={[
        {
          name: translate("statistic.title"),
          href: PATH_APP.statistic.root,
        },
        {
          name: translate("statistic.debitCompany.title"),
          href: PATH_APP.statistic.debit,
        },
        {
          name: `${translate("statistic.debitCompanyDetail.title")} ${title}`,
        },
      ]}
    />
  );
};
export default Header;
