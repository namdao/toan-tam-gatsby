import { CUSTOMER_TYPE } from "scenes/customer/redux/types";

export type IReqReadNoti = {
  ids: number[];
};

export enum NOTI_TYPE {
  UNFOLLOW = "UNFOLLOW",
  DESIGNING = "DESIGNING",
  FEEDBACK_DESIGN = "FEEDBACK_DESIGN",
  FEEDBACK_DESIGNING = "FEEDBACK_DESIGNING",
  ORDER_CANCELED = "ORDER_CANCELED",
}
export type IDataNoti = {
  id: number;
  order_id: number;
  read: boolean;
  type: NOTI_TYPE;
  created_time: string;
  order: {
    order_no: string;
    customer: {
      id: number;
      email: string;
      name: string;
      address: string;
      city: string;
      status: number;
      ward: string;
      district: string;
      customer_type: CUSTOMER_TYPE;
      company_id: number;
      phone: string;
    };
  };
};
