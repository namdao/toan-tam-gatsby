import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { alpha, Paper, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { FC } from "react";
import { DATA_TIMLINE_STATUS } from "scenes/orders/helper/OrderTimeline";
import { IOrderDetail } from "scenes/orders/redux/types";
type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
  loading: boolean;
};
const BlockTimeLine: FC<IPropsInfoOrder> = ({ data, loading }) => {
  if (loading || (data && data?.notes?.length < 1)) return null;
  const timelineNotes = data?.notes.map((val, key) => {
    const timelineData = DATA_TIMLINE_STATUS[val.status];
    return {
      key,
      title: val.user_change,
      des: val.note,
      time: format(parseISO(val.created_time), "dd/MM/yyyy hh:mm:ss"),
      ...timelineData,
    };
  });

  if (!timelineNotes || timelineNotes?.length < 1) return null;

  return (
    <Timeline position="alternate" sx={{ pt: 4 }}>
      {timelineNotes.map((item) => (
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
                bgcolor: (theme) => alpha(theme.palette.primary.lighter, 0.3),
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
  );
};
export default BlockTimeLine;
