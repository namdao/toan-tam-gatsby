import { Box, Typography } from "@mui/material";
import React from "react";
import { fShortenNumber, fCurrency } from "utils/formatNumber";

const UserReport = () => {
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
          <Typography variant="subtitle1">{fShortenNumber(1000)}</Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Số lượng đơn tháng trước
          </Typography>

          <Typography variant="subtitle1">{fShortenNumber(1000)}</Typography>
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
          <Typography variant="subtitle1">{fCurrency(1000)}</Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Doanh thu tháng trước
          </Typography>

          <Typography variant="subtitle1">{fCurrency(1000)}</Typography>
        </div>
      </Box>
    </Box>
  );
};
export default UserReport;
