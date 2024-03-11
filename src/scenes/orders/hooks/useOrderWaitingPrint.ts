import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { CategoriesSelector } from "scenes/categories/redux/slice";
import { IPaperTabs, PAPER_TABS } from "scenes/papers/helper/PaperConstant";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
import { useAppSelector } from "store";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { getListCategoryId } from "../helper/OrderWaitingPrint";
import { apiAssignOrder, apiOrderCategory, apiOrderPaper } from "../redux/api";
import {
  IOrderDetail,
  IReqOrderCategoryStatus,
  IReqOrderPaperList,
  IReqOrderPaperSearch,
  IResOrderByCategory,
} from "../redux/types";

export type IPage = {
  page: number;
  pageSize: number;
};
export const useOrderWaitingPrint = (
  tabSelected: IPaperTabs = PAPER_TABS[0]
) => {
  // const dataCategory = useAppSelector(CategoriesSelector.getListCategories);

  // const listIdPaperOther = useAppSelector(
  //   PaperTypeSelector.getListIdPaperOther
  // ).join(",");
  const listIdOthers = useAppSelector(
    PaperTypeSelector.getListIdPaperOther2
  ).join(",");
  const listIdPaperLikeName = useAppSelector((state) =>
    PaperTypeSelector.getListIdPaperLikeName(state, tabSelected.value).join(",")
  );
  // const categoriesByValue = getListCategoryId(dataCategory, categoryValue);
  const [orderList, setOrderList] = useState<IOrderDetail[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [pageModel, setPageModel] = useState<IPage>({
    page: 0,
    pageSize: 20,
  });
  const { translate } = useLocales();
  // const isTabsCategory = tabSelected.value === "Sticker";
  const isTabsOther = tabSelected.value === "other";
  let listIdPaper = isTabsOther ? listIdOthers : listIdPaperLikeName;
  // if (tabSelected.value === PAPER_TABS[4].value) {
  //   listIdPaper = listIdPaperOther;
  //   // sticker là loại hàng hóa, không phải loại giấy
  // } else if (tabSelected.value === PAPER_TABS[1].value) {
  //   listIdPaper = getListCategoryId(dataCategory, "Sticker");
  // } else {
  //   listIdPaper = listIdPaperLikeName;
  // }

  // const onOrderWithCategories = async (pageReqModel: IPage = pageModel) => {
  //   try {
  //     const payload: IReqOrderCategoryStatus = {
  //       status: `${ORDER_STATUS_NAME.DESIGNED},1`,
  //       order_by: "updated_time",
  //       page: pageReqModel.page,
  //       per_page: pageReqModel.pageSize,
  //       sort_direction: "desc",
  //       category: listIdPaper,
  //     };
  //     if (isTabsOther) {
  //     }
  //     const result: IResponseType<IResOrderByCategory> = await apiOrderCategory(
  //       payload
  //     );
  //     if (result?.data) {
  //       if (isNumber(result.data.total) && isArray(result.data.items)) {
  //         setOrderList(result.data.items);
  //         setTotal(result.data.total);
  //       }
  //     }
  //   } catch (error) {
  //     enqueueSnackbar((error as Error)?.message || "onOrderWithStatus error", {
  //       variant: "error",
  //     });
  //   }
  // };
  const onOrderWithPaperIds = async (
    pageReqModel: IPage = pageModel,
    search?: string
  ) => {
    try {
      let payload: IReqOrderPaperList | IReqOrderPaperSearch = {
        paper_ids: listIdPaper,
        page: pageReqModel.page === 0 ? 1 : pageReqModel.page,
        per_page: pageReqModel.pageSize,
      };
      if (search) {
        payload = {
          search_by: "order_no",
          search,
          page: 1,
          per_page: 20,
        };
      }
      const result: IResponseType<IResOrderByCategory> = await apiOrderPaper(
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

  const onGetOrderPaperOrCategory = (pageReqModel: IPage = pageModel) => {
    // if (isTabsCategory) {
    //   onOrderWithCategories(pageReqModel);
    // } else {
    // }
    onOrderWithPaperIds(pageReqModel);
  };

  const onNextPage = (page: number, pageSize: number) => {
    setPageModel({ page: page, pageSize });
    // if (isTabsCategory) {
    //   onOrderWithCategories({ page: page + 1, pageSize });
    // } else {
    // }
    onOrderWithPaperIds({ page: page + 1, pageSize });
  };

  const onAcceptOrder = async (id: number, statusOrder: ORDER_STATUS_NAME) => {
    let status = true;
    try {
      const result = await apiAssignOrder(id, statusOrder);
      if (result.data) {
        enqueueSnackbar(
          translate("orders.orderWaitingPrintList.success.assign")
        );
      } else {
        enqueueSnackbar(
          translate("orders.orderWaitingPrintList.error.assign"),
          {
            variant: "error",
          }
        );
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
    onOrderWithPaperIds,
    onNextPage,
    onAcceptOrder,
    setPageModel,
    onGetOrderPaperOrCategory,
    orderList,
    total,
    pageModel,
  };
};
