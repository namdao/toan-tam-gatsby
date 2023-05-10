import React, { FC, lazy, Suspense } from "react";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import { fShortenNumber } from "utils/formatNumber";
// components
import { useChart } from "components/chart";
import { ICustomerDebit } from "scenes/statistic/redux/type";

const ChartLazy = lazy(() => import("react-apexcharts"));
type Props = {
  listCustomerDebit: ICustomerDebit[];
};
const BlockTopCompanyDebit: FC<Props> = ({ listCustomerDebit }) => {
  const top10Company = listCustomerDebit.slice(0, 10).map((e) => {
    return {
      label: e.company_name,
      value: e.delta,
    };
  });

  const chartSeries = top10Company.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      events: {
        dataPointSelection: (e, chart, options) => {
          console.log(chart, options);
        },
      },
    },
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
    xaxis: {
      labels: {
        // show: false,
        formatter: function (val) {
          return fShortenNumber(val);
        },
      },
      categories: top10Company.map((i) => i.label),
    },
  });

  return (
    <Grid item xs={12} md={6} lg={8}>
      <Card>
        <CardHeader title={"Top 10 công ty công nợ lớn nhất"} />
        <Box sx={{ mx: 3 }} dir="ltr">
          <Suspense fallback={<div />}>
            <ChartLazy
              type="bar"
              series={[{ data: chartSeries }]}
              options={chartOptions}
              height={425}
            />
          </Suspense>
        </Box>
      </Card>
    </Grid>
  );
};

export default BlockTopCompanyDebit;
