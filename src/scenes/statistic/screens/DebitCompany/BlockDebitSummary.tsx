import { Container, Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useStatisticDebit } from "scenes/statistic/hooks/useStatisticDebit";
import CardSummary from "./CardSummary";

const BlockSumaryDebit = () => {
  const { getTotalDebit, dataDebit } = useStatisticDebit();

  useEffect(() => {
    getTotalDebit();
  }, []);

  const sectionSumaryDebit = useCallback(() => {
    const rest = dataDebit.total_debit - dataDebit.total_paid;
    return (
      <Container
        sx={{
          marginLeft: 0,
          marginBottom: 3,
          paddingLeft: "0px !important",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CardSummary
              title="Tổng công nợ"
              total={dataDebit.total_debit || 0}
              color="error"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardSummary title="Tổng thu" total={dataDebit.total_paid || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardSummary title="Chưa thu" total={rest} color="warning" />
          </Grid>
        </Grid>
      </Container>
    );
  }, [dataDebit]);
  return sectionSumaryDebit();
};
export default BlockSumaryDebit;
