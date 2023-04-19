import { Box, Skeleton, Typography } from "@mui/material";
import Counter from "components/animate/counter";
import { endOfMonth, format, startOfMonth } from "date-fns";
import React, { FC, useEffect } from "react";
import { useReportUser } from "scenes/users/hooks/useUserReport";
import { IReqEmployeeReport } from "scenes/users/redux/types";
import { fShortenNumber, fCurrency } from "utils/formatNumber";

type IPropsUser = {
  userId: number;
};
const UserReport: FC<IPropsUser> = ({ userId }) => {
  const {
    onGetReportSummaryByUser,
    loadingMonth,
    loadingYear,
    dataReportOfMonth,
    dataReportOfYear,
  } = useReportUser();
  const abort = new AbortController();
  useEffect(() => {
    const currDate = new Date();
    const last_date_in_last_month = format(currDate, "yyyy-MM-dd");
    const first_day_in_year = `${currDate.getFullYear()}-01-01`;
    currDate.setMonth(currDate.getMonth() - 1);
    const date_to = format(endOfMonth(currDate), "yyyy-MM-dd");
    const date_from = format(startOfMonth(currDate), "yyyy-MM-dd");
    const paramsMonth: IReqEmployeeReport = {
      employee_id: userId,
      date_from,
      date_to,
      isLastMonth: true,
    };
    onGetReportSummaryByUser(paramsMonth, "month", abort.signal);
    const paramsYear: IReqEmployeeReport = {
      employee_id: userId,
      date_from: first_day_in_year,
      date_to: last_date_in_last_month,
      isInYear: true,
    };
    onGetReportSummaryByUser(paramsYear, "year", abort.signal);
    return () => {
      abort.abort();
    };
  }, [userId]);
  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 2 }}>
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Số lượng đơn trong năm
          </Typography>
          <Typography variant="subtitle1">
            {loadingYear ? (
              <Skeleton />
            ) : (
              <Counter
                from={0}
                to={dataReportOfYear?.total_order || 0}
                format={fShortenNumber}
              />
            )}
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Số lượng đơn tháng trước
          </Typography>

          <Typography variant="subtitle1">
            {loadingMonth ? (
              <Skeleton />
            ) : (
              <Counter
                from={0}
                to={dataReportOfMonth?.total_order || 0}
                format={fShortenNumber}
              />
            )}
          </Typography>
        </div>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ pb: 1 }}>
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Doanh thu trong năm
          </Typography>
          <Typography variant="subtitle1">
            {loadingYear ? (
              <Skeleton />
            ) : (
              <Counter
                from={0}
                to={dataReportOfYear?.total_income || 0}
                format={fCurrency}
              />
            )}
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Doanh thu tháng trước
          </Typography>

          <Typography variant="subtitle1">
            {loadingMonth ? (
              <Skeleton />
            ) : (
              <Counter
                from={0}
                to={dataReportOfMonth?.total_income || 0}
                format={fCurrency}
              />
            )}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};
export default UserReport;
