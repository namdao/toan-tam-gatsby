import {
  Card,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { format, parseISO, parse, isValid } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import { useLocales } from "locales";
import { IPaymentHistory, IPaymentHistoryChange } from "scenes/orders/redux/types";
import { apiPaymentHistory } from "scenes/orders/redux/api";
import { IResponseType } from "constant/commonType";
import { fNumber } from "utils/formatNumber";
import { useSnackbar } from "notistack";

type IProps = {
  orderId: number;
};

const ACTION_COLORS: Record<
  string,
  "primary" | "success" | "info" | "warning" | "error" | "default"
> = {
  update_deposite: "info",
  update_cash: "success",
  update_cod: "warning",
  update_company_debit: "error",
  update_done: "success",
  update_debt: "warning",
  update_need_check: "info",
  update_money_source: "info",
  update_who_collect_money: "info",
  update_date_collect_money: "info",
  update_payment_method: "info",
  update_confirmed_money: "success",
};

const getColor = (action: string) => ACTION_COLORS[action] || "default";

// Fields that contain monetary numbers
const MONEY_FIELDS = new Set([
  "deposite",
  "cash",
  "cod",
  "company_debit",
]);

// Fields that contain dates
const DATE_FIELDS = new Set([
  "date_collect_money",
]);

const formatChangeValue = (field: string, raw: string): string => {
  if (raw === "None" || raw === "" || raw === "null") return "-";

  if (DATE_FIELDS.has(field)) {
    // Try parsing as "dd/MM/yyyy HH:mm" (backend format)
    const parsed = parse(raw, "dd/MM/yyyy HH:mm", new Date());
    if (isValid(parsed)) return format(parsed, "dd/MM/yyyy HH:mm");
    // Fallback: try ISO
    const iso = parseISO(raw);
    if (isValid(iso)) return format(iso, "dd/MM/yyyy HH:mm");
    return raw;
  }

  if (MONEY_FIELDS.has(field)) {
    const num = parseFloat(raw);
    if (!isNaN(num)) return fNumber(num.toString());
    return raw;
  }

  // Boolean fields
  if (raw === "True") return "Có";
  if (raw === "False") return "Không";

  return raw;
};

const BlockPaymentHistory: FC<IProps> = ({ orderId }) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [histories, setHistories] = useState<IPaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setLoading(true);
        const result: IResponseType<IPaymentHistory[]> =
          await apiPaymentHistory(orderId);
        if (result?.data) {
          setHistories(result.data);
        }
      } catch (error) {
        enqueueSnackbar(
          (error as Error)?.message || "Failed to load payment history",
          { variant: "error" }
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHistories();
  }, [orderId]);

  if (loading) {
    return (
      <Card>
        <CardHeader
          title={translate("orders.orderDetail.paymentHistory.title")}
          sx={{ color: (theme) => theme.palette.primary.main }}
        />
        <Stack sx={{ px: 3, py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Đang tải...
          </Typography>
        </Stack>
      </Card>
    );
  }

  if (histories.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title={translate("orders.orderDetail.paymentHistory.title")}
        sx={{ color: (theme) => theme.palette.primary.main }}
      />
      <Stack sx={{ px: 3, py: 2 }}>
        <Timeline position="right">
          {histories.map((item, index) => {
            const isLast = index === histories.length - 1;
            const changes = item.changes || [];

            return (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent
                  sx={{ flex: 0.3, py: "12px", px: 2 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {item.created_time
                      ? format(parseISO(item.created_time), "dd/MM/yyyy HH:mm")
                      : "-"}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {!isLast && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Stack spacing={1}>
                    {/* User info */}
                    <Typography variant="caption" color="text.secondary">
                      {item.user
                        ? `${item.user.first_name} ${item.user.last_name}`
                        : "Hệ thống"}
                    </Typography>

                    {/* Each changed field */}
                    <Stack spacing={0.5}>
                      {changes.map((change: IPaymentHistoryChange, ci: number) => (
                        <Stack
                          key={ci}
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          flexWrap="wrap"
                          sx={{ gap: 0.5 }}
                        >
                          <Chip
                            label={change.display_name}
                            size="small"
                            color={getColor(change.action)}
                            variant="filled"
                          />
                          <Typography variant="body2">
                            {formatChangeValue(change.field, change.old_value)} →{" "}
                            {formatChangeValue(change.field, change.new_value)}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    {/* Note if any */}
                    {item.note && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          color: "text.secondary",
                        }}
                      >
                        Ghi chú: {item.note}
                      </Typography>
                    )}
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Stack>
    </Card>
  );
};

export default BlockPaymentHistory;
