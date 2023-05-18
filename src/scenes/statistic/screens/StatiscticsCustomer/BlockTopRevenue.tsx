import React, { FC, lazy, Suspense, useEffect } from "react";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import { fShortenNumber } from "utils/formatNumber";
// components
import { useChart } from "components/chart";
import { DateRange } from "@mui/x-date-pickers-pro";
import { useRevenueCompany } from "scenes/statistic/hooks/useRevenueCompany";

const ChartLazy = lazy(() => import("react-apexcharts"));
type Props = {
  dateRange: DateRange<Date>;
  money: number;
};
const BlockTopRevenue: FC<Props> = ({ dateRange, money }) => {
  const { dataRevenue, getRevenueByMoney } = useRevenueCompany();
  useEffect(() => {
    getRevenueByMoney(
      money,
      dateRange[0] || new Date(),
      dateRange[1] || new Date()
    );
  }, [dateRange]);
  const chartSeries = dataRevenue.map((i) => i.total_income);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: number) => fShortenNumber(value),
        title: {
          formatter: () => "",
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val) {
        return fShortenNumber(val as number);
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        borderRadius: 2,
      },
    },
    yaxis: {
      labels: {
        minWidth: 200,
        maxWidth: 500,
        // maxWidth: "100%",
      },
    },
    xaxis: {
      labels: {
        // show: false,
        formatter: function (val) {
          return fShortenNumber(val);
        },
      },
      categories: dataRevenue.map((i) => i.company_name),
    },
  });

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card>
        <CardHeader
          title={`Top ${
            dataRevenue.length
          } công ty doanh số trên ${fShortenNumber(money)} `}
        />
        <Box sx={{ mx: 3 }} dir="ltr">
          <Suspense fallback={<div />}>
            <ChartLazy
              type="bar"
              series={[{ data: chartSeries }]}
              options={chartOptions}
              height={300}
            />
          </Suspense>
        </Box>
      </Card>
    </Grid>
  );
};

export default BlockTopRevenue;
