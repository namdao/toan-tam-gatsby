import { Container, Grid, Typography } from "@mui/material";

import { HistoryLocation } from "@reach/router";
import React, { FC } from "react";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";

type Props = {
  company_id: string;
  location: HistoryLocation;
};
const StatiscticsCustomerDetail: FC<Props> = ({ location, company_id }) => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const params = new URLSearchParams(location.search);
  const titleCompany = params.get("company") || "";
  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Chi tiết doanh số khách hàng {titleCompany}
      </Typography>
      <Grid container spacing={3}></Grid>
    </Container>
  );
};
export default StatiscticsCustomerDetail;
