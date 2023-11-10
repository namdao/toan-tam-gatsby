import { ICustomer, IResponseType } from "constant/commonType";
import { isArray } from "lodash";
import { useState } from "react";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import {
  apiGetCustomerByOrderStatus,
  apiGetOrderByCustomer,
} from "../redux/api";
import {
  IOrder,
  IResCustomerByStatusOrder,
  IResOrderByCustomer,
} from "../redux/types";

const per_page = 5;
export type IOrderByCustomer = {
  customer: ICustomer;
  listOrder: IOrder[];
};
const useOrderByCustomer = (status: ORDER_STATUS_NAME) => {
  const getCustomerInfinity = async (
    currentPage: number,
    status: ORDER_STATUS_NAME
  ) => {
    try {
      const result: IResponseType<IResCustomerByStatusOrder> =
        await apiGetCustomerByOrderStatus({
          status,
          page: currentPage,
          per_page,
        });
      const listTemp: IOrderByCustomer[] = [];
      if (result.data && isArray(result.data.items)) {
        for (let child of result.data.items) {
          const resultCustomer = await getOrderByCustomer(child.id);
          if (resultCustomer.status && resultCustomer.listItems) {
            listTemp.push({
              customer: child,
              listOrder: resultCustomer.listItems,
            });
          }
        }
        const pageParam = result.data?.items.length > 0 ? currentPage + 1 : -1;
        return {
          data: listTemp,
          pageParam,
        };
      }
      return {
        data: [],
        pageParam: -1,
      };
    } catch (error) {
      console.log(error);
      return {
        data: [],
        pageParam: -1,
      };
    }
  };

  const getOrderByCustomer = async (
    customerId: number,
    signal?: AbortSignal
  ) => {
    try {
      const result: IResponseType<IResOrderByCustomer> =
        await apiGetOrderByCustomer(customerId, status, signal);
      if (result.data) {
        return {
          status: true,
          listItems: result.data.items,
        };
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
      };
    }
  };

  return {
    getCustomerInfinity,
  };
};
export default useOrderByCustomer;
