import { Container, Grid, Typography } from "@mui/material";

import { HistoryLocation } from "@reach/router";
import { parseInt } from "lodash";
import React, { FC } from "react";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import OrderTable from "./OrderTable";
type Props = {
  company_id: string;
  location: HistoryLocation;
};
const StatiscticsCustomerDetail: FC<Props> = ({ location, company_id }) => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const params = new URLSearchParams(location.search);
  const titleCompany = params.get("company") || "";
  const dateFrom = params.get("dateFrom") || "";
  const dateTo = params.get("dateTo") || "";
  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Header title={titleCompany} dateFrom={dateFrom} dateTo={dateTo} />
      <Grid container spacing={3}>
        <OrderTable
          dateFrom={dateFrom}
          dateTo={dateTo}
          companyId={parseInt(company_id)}
        />
      </Grid>
    </Container>
  );
};
export default StatiscticsCustomerDetail;
