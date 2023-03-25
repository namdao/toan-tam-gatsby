import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  alpha,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "components/iconify";
import Label from "components/label";
import { Link } from "gatsby-theme-material-ui";
import { useLocales } from "locales";
import React, { FC, useEffect } from "react";
import Helmet from "react-helmet";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import BlockHeader from "./BlockHeader";
import { BlockInfoOrderSkelekton } from "../../components/BlockOrderDetailSkeleton";
import BlockInfoCustomer from "./BlockInfoCustomer";
import { useOrderDetail } from "scenes/orders/hooks/useOrderDetail";
import BlockInfoOrder from "./BlockInfoOrder";
import BlockPriceOrder from "./BlockPriceOrder";
import BlockEmployeeInfo from "./BlockEmployeeInfo";
type IProps = {
  orderId: number;
};
const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "inherit"
    | "grey"
    | "secondary";
  icon: React.ReactElement;
};
const TIMELINES: TimelineType[] = [
  {
    key: 1,
    title: "Default",
    des: "Morbi mattis ullamcorper",
    time: "09:30 am",
    icon: <Iconify icon="eva:folder-add-fill" width={24} />,
  },
  {
    key: 2,
    title: "Primary",
    des: "Morbi mattis ullamcorper",
    time: "10:00 am",
    color: "primary",
    icon: <Iconify icon="eva:image-2-fill" width={24} />,
  },
  {
    key: 3,
    title: "Secondary",
    des: "Morbi mattis ullamcorper",
    time: "10:00 am",
    color: "secondary",
    icon: <Iconify icon="eva:pantone-fill" width={24} />,
  },
  {
    key: 4,
    title: "Info",
    des: "Morbi mattis ullamcorper",
    time: "10:30 am",
    color: "info",
    icon: <Iconify icon="eva:tv-fill" width={24} />,
  },
  {
    key: 5,
    title: "Success",
    des: "Morbi mattis ullamcorper",
    time: "11:00 am",
    color: "success",
    icon: <Iconify icon="eva:activity-fill" width={24} />,
  },
  {
    key: 6,
    title: "Warning",
    des: "Morbi mattis ullamcorper",
    time: "11:30 am",
    color: "warning",
    icon: <Iconify icon="eva:cube-fill" width={24} />,
  },
  {
    key: 7,
    title: "Error",
    des: "Morbi mattis ullamcorper",
    time: "12:00 am",
    color: "error",
    icon: <Iconify icon="eva:film-fill" width={24} />,
  },
];
const OrderDetail: FC<IProps> = ({ orderId }) => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { loading, orderDetail, onOrderDetail } = useOrderDetail(orderId);
  const { translate } = useLocales();

  useEffect(() => {
    onOrderDetail();
  }, []);
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Helmet title={translate("orders.orderProcessing.detail", { orderId })} />
      <BlockHeader orderId={orderId} />
      <BlockInfoCustomer data={orderDetail} loading={loading} />
      <BlockInfoOrder data={orderDetail} loading={loading} />
      <BlockPriceOrder data={orderDetail} loading={loading} />
      <BlockEmployeeInfo data={orderDetail} loading={loading} />

      <Timeline position="alternate">
        {TIMELINES.map((item) => (
          <TimelineItem key={item.key}>
            <TimelineOppositeContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={item.color}>{item.icon}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: (theme) => alpha(theme.palette.info.main, 0.12),
                }}
              >
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.des}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};
export default OrderDetail;
