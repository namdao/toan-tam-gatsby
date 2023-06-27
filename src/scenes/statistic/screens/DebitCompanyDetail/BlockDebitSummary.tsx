import { Container, Grid } from "@mui/material";
import React, { FC, useCallback } from "react";
import CardSummary from "./CardSummary";

type PropsDebit = {
  totalDebit: number;
  totalPaid: number;
  delta: number;
};
const BlockSumaryDebit: FC<PropsDebit> = ({ totalDebit, totalPaid, delta }) => {
  const sectionSumaryDebit = useCallback(() => {
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
              total={totalDebit}
              color="error"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardSummary title="Tổng thu" total={totalPaid} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardSummary title="Chưa thu" total={delta} color="warning" />
          </Grid>
        </Grid>
      </Container>
    );
  }, []);
  return sectionSumaryDebit();
};
export default BlockSumaryDebit;
