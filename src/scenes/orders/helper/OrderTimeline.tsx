import React from "react";
import Iconify from "components/iconify";
import { ORDER_STATUS_NAME } from "./OrderConstant";
import { ICON } from "constant/layoutConstant";

type IPropsTimeLineStatus = {
  color:
    | "error"
    | "grey"
    | "primary"
    | "info"
    | "inherit"
    | "secondary"
    | "success"
    | "warning"
    | undefined;
  des: string;
  icon: React.ReactElement;
};
export const DATA_TIMLINE_STATUS: Record<
  ORDER_STATUS_NAME,
  IPropsTimeLineStatus
> = {
  [ORDER_STATUS_NAME.CANCEL]: {
    color: "error",
    des: "Huỷ đơn",
    icon: (
      <Iconify
        icon="material-symbols:cancel-outline"
        width={ICON.NAV_ITEM}
        color={"red"}
      />
    ),
  },
  [ORDER_STATUS_NAME.DRAFT]: {
    color: "grey",
    des: "Nháp",
    icon: (
      <Iconify
        icon="icon-park-solid:zero-key"
        width={ICON.NAV_ITEM}
        color={"grey"}
      />
    ),
  },
  [ORDER_STATUS_NAME.SALE]: {
    color: "grey",
    des: "Chốt đơn",
    icon: (
      <Iconify
        icon="ic:round-looks-one"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.DESIGNING]: {
    color: "info",
    des: "Đang TK",
    icon: (
      <Iconify
        icon="ic:round-looks-two"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.WAITING_FEEDBACK]: {
    color: "info",
    des: "Chờ phản hồi",
    icon: (
      <Iconify
        icon="ph:number-square-three-fill"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.DESIGNING_AFTER_FEEDBACK]: {
    color: "info",
    des: "TK sau phản hồi",
    icon: (
      <Iconify
        icon="icon-park-solid:four-keyd"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.DESIGNED]: {
    color: "info",
    des: "Đã TK",
    icon: (
      <Iconify
        icon="icon-park-solid:five-key"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.PRINTING]: {
    color: "info",
    des: "Đang in",
    icon: (
      <Iconify
        icon="icon-park-solid:six-key"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.PRINTED]: {
    color: "info",
    des: "Đã in",
    icon: (
      <Iconify
        icon="icon-park-solid:seven-key"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.STORED]: {
    color: "info",
    des: "Lưu kho",
    icon: (
      <Iconify
        icon="icon-park-solid:eight-key"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.DELIVER]: {
    color: "info",
    des: "Giao hàng",
    icon: (
      <Iconify
        icon="icon-park-solid:nine-key"
        width={ICON.NAV_ITEM}
        color={(theme) => theme.palette.primary.main}
      />
    ),
  },
  [ORDER_STATUS_NAME.DONE]: {
    color: "primary",
    des: "Hoàn thành",
    icon: (
      <Iconify
        icon="mdi:success-circle"
        width={ICON.NAV_ITEM}
        color={"green"}
      />
    ),
  },
};
