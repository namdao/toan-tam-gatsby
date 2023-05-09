import { Card, CardHeader, Grid, styled, useTheme } from "@mui/material";
import React, { useEffect, lazy, Suspense, FC } from "react";
import { useChart } from "components/chart";
import { fNumber } from "utils/formatNumber";
import { useStatisticDebit } from "scenes/statistic/hooks/useStatisticDebit";
import { ICustomerDebit } from "scenes/statistic/redux/type";

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const ChartLazy = lazy(() => import("react-apexcharts"));
const StyledChart = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": {
    height: CHART_HEIGHT,
  },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important" as "relative",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

type Props = {
  listCustomerDebit: ICustomerDebit[];
};
const BlockPercentDebit: FC<Props> = ({ listCustomerDebit }) => {
  const above50Milion = listCustomerDebit.filter(
    (e) => e.total_debit > 50000000
  ).length;
  const above10Milion = listCustomerDebit.filter(
    (e) => e.total_debit > 10000000 && e.total_debit < 50000000
  ).length;
  const theRest = listCustomerDebit.length - above50Milion - above10Milion;
  const theme = useTheme();
  const chart = {
    series: [
      { label: "Trên 50 triệu", value: above50Milion },
      { label: "Trên 10 triệu", value: above10Milion },
      { label: "Dưới 10 triệu", value: theRest },
    ],
    colors: [
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.warning.main,
    ],
  };
  const { colors, series } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => `- ${fNumber(value)} công ty`,
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardHeader title={"Tỉ lệ % công nợ theo công ty"} />
        <StyledChart dir="ltr">
          <Suspense fallback={<div />}>
            <ChartLazy
              type="pie"
              series={chartSeries}
              options={chartOptions}
              height={300}
            />
          </Suspense>
        </StyledChart>
      </Card>
    </Grid>
  );
};

export default BlockPercentDebit;
