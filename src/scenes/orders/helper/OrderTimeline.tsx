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
  icon: React.ReactElement;
};
export const DATA_TIMLINE_STATUS: Record<
  ORDER_STATUS_NAME,
  IPropsTimeLineStatus
> = {
  [ORDER_STATUS_NAME.CANCEL]: {
    color: "error",
    icon: (
      <Iconify
        icon="material-symbols:scan-delete-outline"
        width={ICON.NAV_ITEM}
      />
    ),
  },
  [ORDER_STATUS_NAME.DRAFT]: {
    color: "grey",
    icon: <Iconify icon="mdi:file-question-outline" width={ICON.NAV_ITEM} />,
  },
  [ORDER_STATUS_NAME.SALE]: {
    color: "grey",
    icon: <Iconify icon="carbon:task-complete" width={ICON.NAV_ITEM} />,
  },
  [ORDER_STATUS_NAME.DESIGNING]: {
    color: "info",
    icon: <Iconify icon="iconoir:design-nib" width={ICON.NAV_ITEM} />,
  },
  [ORDER_STATUS_NAME.WAITING_FEEDBACK]: {
    color: "info",
    icon: <Iconify icon="medical-icon:i-waiting-area" width={ICON.NAV_ITEM} />,
  },
  [ORDER_STATUS_NAME.DESIGNING_AFTER_FEEDBACK]: {
    color: "info",
    icon: (
      <Iconify icon="icon-park-outline:turn-around" width={ICON.NAV_ITEM} />
    ),
  },
  [ORDER_STATUS_NAME.DESIGNED]: {
    color: "info",
    icon: (
      <Iconify
        icon="fluent-mdl2:waitlist-confirm-mirrored"
        width={ICON.NAV_ITEM}
      />
    ),
  },
  [ORDER_STATUS_NAME.PRINTING]: {
    color: "info",
    icon: (
      <Iconify
        icon="material-symbols:change-circle-outline"
        width={ICON.NAV_ITEM}
      />
    ),
  },
  [ORDER_STATUS_NAME.PRINTED]: {
    color: "info",
    icon: (
      <Iconify
        icon="material-symbols:print-connect-outline"
        width={ICON.NAV_ITEM}
      />
    ),
  },
  [ORDER_STATUS_NAME.STORED]: {
    color: "info",
    icon: <Iconify icon="ic:round-save-alt" width={ICON.NAV_ITEM} />,
  },
  [ORDER_STATUS_NAME.DELIVER]: {
    color: "info",
    icon: <Iconify icon="carbon:delivery" width={ICON.NAV_ITEM} />,
  },
  [ORDER_STATUS_NAME.DONE]: {
    color: "primary",
    icon: <Iconify icon="fluent-mdl2:completed" width={ICON.NAV_ITEM} />,
  },
};
