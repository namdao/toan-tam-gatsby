import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  CardHeader,
} from "@mui/material";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { endOfMonth, startOfMonth, format } from "date-fns";
import React, { useState } from "react";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import BlockTopRevenue from "./BlockTopRevenue";
import TableListRevenue from "./TableListRevenue";

const StatiscticsCustomer = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const [dateListRange, setDateListRange] = useState<DateRange<Date>>([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);

  const renderBlockDate = () => (
    <Grid item xs={12} sm={12} md={12}>
      <Grid item xs={12} sm={12} md={4}>
        <Card>
          <CardHeader title={"Chọn thời gian"} />
          <Box sx={{ p: 3 }}>
            <DateRangePicker
              value={dateListRange}
              disableFuture
              disableAutoMonthSwitching
              onChange={setDateListRange}
              inputFormat={"dd/MM/yyyy"}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} label="Bắt đầu" />
                  <Box sx={{ mx: 2 }}> - </Box>
                  <TextField {...endProps} label="Kết thúc" />
                </>
              )}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Báo cáo doanh số khách hàng
      </Typography>
      <Grid container spacing={3}>
        {renderBlockDate()}
        <BlockTopRevenue money={50000000} dateRange={dateListRange} />
        <BlockTopRevenue money={10000000} dateRange={dateListRange} />
        <BlockTopRevenue money={1000000} dateRange={dateListRange} />
        <TableListRevenue dateRange={dateListRange} />
      </Grid>
    </Container>
  );
};
export default StatiscticsCustomer;
