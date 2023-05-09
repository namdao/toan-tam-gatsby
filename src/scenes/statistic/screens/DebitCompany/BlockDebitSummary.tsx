import { Grid } from "@mui/material";
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
      <>
        <Grid item xs={12} sm={6} md={4}>
          <CardSummary
            title="Tổng công nợ"
            total={dataDebit.total_debit || 0}
            icon="mdi:cash-lock"
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardSummary
            title="Tổng thu"
            total={dataDebit.total_paid || 0}
            icon="game-icons:take-my-money"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardSummary
            title="Chưa thu"
            total={rest}
            color="warning"
            icon="ic:twotone-money-off-csred"
          />
        </Grid>
      </>
    );
  }, [dataDebit]);
  return sectionSumaryDebit();
};
export default BlockSumaryDebit;
