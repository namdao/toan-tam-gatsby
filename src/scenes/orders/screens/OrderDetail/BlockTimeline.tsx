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
  Box,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { FC } from "react";
import { DATA_TIMLINE_STATUS } from "scenes/orders/helper/OrderTimeline";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { IOrderDetail } from "scenes/orders/redux/types";
import Label from "components/label";
type IPropsInfoOrder = {
  data: IOrderDetail | undefined;
  loading: boolean;
};

const BlockTimeLine: FC<IPropsInfoOrder> = ({ data, loading }) => {
  if (loading || (data && data?.notes?.length < 1)) return null;
  const timelineNotes = data?.notes.map((val, key) => {
    const currentStatus = val.new_status ? val.new_status : val.status;
    const timelineData = DATA_TIMLINE_STATUS[currentStatus];
    return {
      key,
      title: val.user_change,
      currentStatus,
      note: val.note,
      time: format(parseISO(val.created_time), "dd/MM/yy hh:mm:ss"),
      ...timelineData,
    };
  });

  if (!timelineNotes || timelineNotes?.length < 1) return null;

  return (
    <Stepper activeStep={timelineNotes.length - 1} alternativeLabel>
      {timelineNotes.map((label) => {
        const labelProps: {
          optional?: React.ReactNode;
          error?: boolean;
        } = {
          optional: (
            <Label
              color={
                label.currentStatus === ORDER_STATUS_NAME.CANCEL
                  ? "error"
                  : "primary"
              }
            >
              {label.des}
            </Label>
          ),
          error: label.currentStatus === ORDER_STATUS_NAME.CANCEL,
        };
        return (
          <Step key={label.time}>
            <StepLabel StepIconComponent={() => label.icon}>
              {label.title}
              <Box
                sx={{
                  p: 3,
                  bgcolor: (theme) => alpha(theme.palette.primary.lighter, 0.3),
                  textAlign: "left",
                }}
              >
                <Label>{label.time}</Label>
                <Typography>{label.note}</Typography>
              </Box>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );

  // return (
  //   <Timeline position="alternate" sx={{ transform: "rotate(90deg)" }}>
  //     {timelineNotes.map((item) => (
  //       <TimelineItem key={item.key} sx={{ height: 300 }}>
  //         <TimelineOppositeContent>
  //           <Typography variant="body2" sx={{ color: "text.secondary" }}>
  //             {item.time}
  //           </Typography>
  //         </TimelineOppositeContent>
  //         <TimelineSeparator>
  //           <TimelineDot
  //             color={item.color}
  //             sx={{ transform: "rotate(-90deg)" }}
  //           >
  //             {item.icon}
  //           </TimelineDot>
  //           <TimelineConnector />
  //         </TimelineSeparator>
  //         <TimelineContent>
  //           <Paper
  //             sx={{
  //               p: 3,
  //               bgcolor: (theme) => alpha(theme.palette.primary.lighter, 0.3),
  //               display: "inline-block",
  //               // transform: "rotate(-90deg)",
  //               textAlign: "center",
  //               // minWidth: 50,
  //             }}
  //           >
  //             <Typography variant="subtitle2">{item.title}</Typography>
  //             <Typography variant="body2" sx={{ color: "text.secondary" }}>
  //               {item.des}
  //             </Typography>
  //           </Paper>
  //         </TimelineContent>
  //       </TimelineItem>
  //     ))}
  //   </Timeline>
  // );
};
export default BlockTimeLine;
