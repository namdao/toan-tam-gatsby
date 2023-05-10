import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useStatisticDebit } from "scenes/statistic/hooks/useStatisticDebit";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import BlockSumaryDebit from "./BlockDebitSummary";
import BlockPercentDebit from "./BlockPercentDebit";
import BlockTopCompanyDebit from "./BlockTopCompanyDebit";
import TableListDebit from "./TableListDebit";

const DebitCompany = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { getListCustomerDebit, listCustomerDebit } = useStatisticDebit();

  useEffect(() => {
    getListCustomerDebit();
  }, []);
  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Báo cáo danh sách công nợ
      </Typography>
      <Grid container spacing={3}>
        <BlockSumaryDebit />
        <BlockPercentDebit listCustomerDebit={listCustomerDebit} />
        <BlockTopCompanyDebit listCustomerDebit={listCustomerDebit} />
        <TableListDebit listCustomerDebit={listCustomerDebit} />
      </Grid>
    </Container>
  );
};

export default DebitCompany;
