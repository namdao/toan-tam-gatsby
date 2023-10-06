import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { CategoriesSelector } from "scenes/categories/redux/slice";
import { ICategoryDefault } from "scenes/categories/redux/types";
import { useAppSelector } from "store";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { getListCategoryId } from "../helper/OrderWaitingPrint";
import { apiAssignOrder, apiOrderCategory } from "../redux/api";
import {
  IOrderDetail,
  IReqOrderCategoryStatus,
  IResOrderByCategory,
} from "../redux/types";

export type IPage = {
  page: number;
  pageSize: number;
};
export const useOrderPrinted = (categoryValue: ICategoryDefault = "Card") => {
  const dataCategory = useAppSelector(CategoriesSelector.getListCategories);
  const categoriesByValue = getListCategoryId(dataCategory, categoryValue);
  const [orderList, setOrderList] = useState<IOrderDetail[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageModel, setPageModel] = useState<IPage>({
    page: 0,
    pageSize: 20,
  });
  const { translate } = useLocales();
  const onOrderWithCategories = async (pageReqModel: IPage = pageModel) => {
    try {
      const payload: IReqOrderCategoryStatus = {
        status: ORDER_STATUS_NAME.PRINTED,
        order_by: "updated_time",
        page: pageReqModel.page,
        per_page: pageReqModel.pageSize,
        sort_direction: "desc",
        category: categoriesByValue,
      };
      const result: IResponseType<IResOrderByCategory> = await apiOrderCategory(
        payload
      );
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          setOrderList(result.data.items);
          setTotal(result.data.total);
        }
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderWithStatus error", {
        variant: "error",
      });
    }
  };

  const onNextPage = (page: number, pageSize: number) => {
    setPageModel({ page: page, pageSize });
    onOrderWithCategories({ page: page + 1, pageSize });
  };

  const onAcceptOrder = async (id: number, statusOrder: ORDER_STATUS_NAME) => {
    let status = true;
    try {
      const result = await apiAssignOrder(id, statusOrder);
      if (result.data) {
        enqueueSnackbar(translate("orders.orderPrinted.success.assign"));
      } else {
        enqueueSnackbar(translate("orders.orderPrinted.error.assign"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onAcceptOrder error", {
        variant: "error",
      });
      status = false;
    }
    return status;
  };
  return {
    onOrderWithCategories,
    onNextPage,
    onAcceptOrder,
    orderList,
    total,
    pageModel,
  };
};
