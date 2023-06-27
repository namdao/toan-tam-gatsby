import React, { useEffect, useState } from "react";
// @mui
import {
  Box,
  Stack,
  List as ListMui,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  useTheme,
  Skeleton,
} from "@mui/material";
// utils
import { fToNow } from "utils/formatTime";
import { List, ListRowRenderer } from "react-virtualized";

// components
import Iconify from "components/iconify";
import MenuPopover from "components/menuPopover";
import IconButtonAnimate from "components/animate/IconButtonAnimate";
import { useNotification } from "services/notifications/hooks/useNotification";
import { IDataNoti, NOTI_TYPE } from "services/notifications/redux/types";
import DiaLogDetail, {
  magicOrderDetailRef,
} from "scenes/orders/screens/OrderDetail/DiaLogDetail";

export default function NotificationsPopover() {
  const { getListNoti, readNoti, readAllLocalNoti, listNotication } =
    useNotification();

  useEffect(() => {
    getListNoti();
  }, []);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const totalUnRead = listNotication.filter(
    (item) => item.read === false
  ).length;

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = async () => {
    const ids = listNotication.map((e) => e.id);
    const isSuccess = await readNoti(ids);
    if (isSuccess) {
      readAllLocalNoti();
    }
  };

  const renderNotiItem: ListRowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const item = listNotication[index];
    if (isScrolling) {
      return (
        <Stack
          key={key}
          style={style}
          direction="row"
          sx={{
            py: 1.5,
            px: 2.5,
            mt: "1px",
            backgroundColor: "white",
          }}
          spacing={2}
          alignItems="center"
        >
          <Skeleton variant="circular" width={50} height={40} />
          <Skeleton variant="rectangular" width="100%" height={24} />
        </Stack>
      );
    }

    return (
      <Box key={key} style={style} sx={{ background: "white" }}>
        <NotificationItem key={item.id} notification={item} />
      </Box>
    );
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? "primary" : "default"}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        keepMounted
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 360, p: 0 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Bạn có {totalUnRead} thông báo chưa đọc
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Đọc tất cả">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        <ListMui
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              Tin gần đây
            </ListSubheader>
          }
        >
          {listNotication.slice(0, 2).map((notification) => (
            <NotificationItem
              key={notification?.id}
              notification={notification}
            />
          ))}
        </ListMui>
        <ListMui
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              Các tin trước
            </ListSubheader>
          }
        >
          <List
            height={300}
            rowCount={listNotication.length}
            rowHeight={90}
            rowRenderer={renderNotiItem}
            width={345}
          />
        </ListMui>
      </MenuPopover>
    </>
  );
}

function NotificationItem({ notification }: { notification: IDataNoti }) {
  const { avatar, title, color } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.read && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: color }}>{avatar}</Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack
            direction="row"
            sx={{ mt: 0.5, typography: "caption", color: "text.disabled" }}
          >
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">
              {fToNow(notification.created_time)}
            </Typography>
          </Stack>
        }
      />
      <DiaLogDetail />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

export const parseContentByType = (notification: IDataNoti) => {
  const { type, order, created_time, id } = notification;
  const { customer, order_no: orderNo } = order || {};
  const { name } = customer || {};
  const days = fToNow(created_time);
  const theme = useTheme();
  switch (type) {
    case NOTI_TYPE.UNFOLLOW:
      return {
        title: "Từ hệ thống",
        content: `Bạn chưa trao đổi với ${name} ${days} ngày`,
        color: theme.palette.primary.main,
        avatar: "HT",
      };
    case NOTI_TYPE.DESIGNING:
      return {
        title: "Từ phòng Design",
        content: `Đơn hàng ${orderNo} đang được xử lý`,
        color: theme.palette.secondary.main,
        avatar: "DES",
      };
    case NOTI_TYPE.FEEDBACK_DESIGN:
      return {
        title: "Từ phòng Design",
        content: `Đơn hàng ${orderNo} chờ phản hồi của khách hàng`,
        color: theme.palette.secondary.main,
        avatar: "DES",
      };
    case NOTI_TYPE.FEEDBACK_DESIGNING:
      return {
        title: "Từ phòng Sale",
        content: `Đơn hàng ${orderNo} đã được khách hàng ${name} xác nhận`,
        color: theme.palette.info.main,
        avatar: "SALE",
      };
    case NOTI_TYPE.ORDER_CANCELED:
      return {
        title: "Từ hệ thống",
        content: `Đơn hàng ${orderNo} đã bị huỷ`,
        color: theme.palette.error.main,
        avatar: "HT",
      };
    default: {
      return { title: "", content: "", color: "", avatar: "" };
    }
  }
};

function renderContent(notification: IDataNoti) {
  const dataContent = parseContentByType(notification);
  const title = (
    <Typography variant="subtitle2">
      {dataContent.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {dataContent.content}
      </Typography>
    </Typography>
  );

  return {
    avatar: dataContent.avatar,
    color: dataContent.color,
    title,
  };
}
