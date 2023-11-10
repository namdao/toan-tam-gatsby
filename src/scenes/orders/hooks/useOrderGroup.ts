import { useLocales } from "locales";
import { isArray, isNumber, truncate } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import { uploadImageToAws } from "utils/imageHandler";
import {
  GROUP_ORDER_TYPE,
  ORDER_STATUS_NAME,
  STATUS_ORDER_GROUP,
} from "../helper/OrderConstant";
import {
  apiCreateGroup,
  apiGetGroupByOrder,
  apiGetOrderGroup,
  apiRequestUploadImg,
  apiUpdateMultiOrderByOrderStatus,
  apiUpdateOrderGroup,
  apiUploadImageGroup,
} from "../redux/api";
import {
  IGroupByOrder,
  IOrderGroup,
  IReqCreateGroup,
  IReqGroupByStatus,
  IReqUpdateMultiOrder,
  IReqUpdateOrderPrinted,
  IResGroupByOrder,
} from "../redux/types";
import { FormValuesGroupProps } from "../screens/OrderListGroup/OrderBtnDoneGroup";

const useOrderGroup = () => {
  const account = useAppSelector(AuthSelector.getProfile);
  const [loading, setLoading] = useState(false);
  const { translate } = useLocales();
  const onCreateGroupDraftOrder = async (data: IReqCreateGroup) => {
    let success = true;
    try {
      setLoading(true);
      let totalLoop = 1;
      if (
        data.group_type === GROUP_ORDER_TYPE.ONLY_ORDER_MULTI_GROUP &&
        data.numberCreateOrder &&
        data.numberCreateOrder > 1
      ) {
        totalLoop = data.numberCreateOrder;
      }
      for (let i = 0; i <= totalLoop - 1; i++) {
        const titleGroup =
          totalLoop !== 1 ? `${data.name} - ${i + 1}` : data.name;
        const result = await apiCreateGroup({ ...data, name: titleGroup });
        if (!result.data) {
          success = false;
        }
      }
      if (success) {
        enqueueSnackbar("Tạo bình bài thành công");
      } else {
        enqueueSnackbar("Bình bài thất bại", {
          variant: "error",
        });
      }
    } catch (error) {
      success = false;
      enqueueSnackbar((error as Error)?.message || "onCreateGroupOrder error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
    return { success };
  };

  const onRejectMultiOrder = (ids: number[]) => {
    const payload: IReqUpdateMultiOrder = {
      order_ids: ids,
      status: ORDER_STATUS_NAME.DESIGNED,
      notes: `${account.userName} đã bỏ đơn hàng ra khỏi bài`,
    };
    return apiUpdateMultiOrderByOrderStatus(payload);
  };

  // const onOrderGroupPrinting = async (pageReq: number) => {
  //   try {
  //     const payload: IReqGroupByStatus = {
  //       status: STATUS_ORDER_GROUP.PRINTING_GROUP,
  //       page: pageReq,
  //       per_page: 10,
  //     };
  //     const result = await apiGetOrderGroup(payload);
  //     if (result?.data) {
  //       if (isNumber(result.data.total) && isArray(result.data.items)) {
  //         return {
  //           data: result?.data.items,
  //           pageParam:
  //             result.data?.items.length > 0 && result.data.items.length > 10
  //               ? pageReq + 1
  //               : -1,
  //         };
  //       }
  //     }
  //     return {
  //       data: [] as IOrderGroup[],
  //       pageParam: -1,
  //     };
  //   } catch (error) {
  //     enqueueSnackbar(
  //       (error as Error)?.message || "onOrderGroupPrinting error",
  //       {
  //         variant: "error",
  //       }
  //     );
  //     return {
  //       data: [] as IOrderGroup[],
  //       pageParam: -1,
  //     };
  //   }
  // };
  const onOrderGroupByStatus = async (
    pageReq: number,
    status: STATUS_ORDER_GROUP
  ) => {
    try {
      const payload: IReqGroupByStatus = {
        status,
        page: pageReq,
        per_page: 10,
        group_types: `${GROUP_ORDER_TYPE.ONLY_ONE_ORDER},${GROUP_ORDER_TYPE.MULTI_ORDER}`,
      };
      const result = await apiGetOrderGroup(payload);
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          return {
            data: result?.data.items,
            pageParam:
              result.data?.items.length > 0 && result.data.items.length > 10
                ? pageReq + 1
                : -1,
          };
        }
      }
      return {
        data: [] as IOrderGroup[],
        pageParam: -1,
      };
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message ||
          `onOrderGroupByStatus error by status ${status}`,
        {
          variant: "error",
        }
      );
      return {
        data: [] as IOrderGroup[],
        pageParam: -1,
      };
    }
  };

  // const onOrderGroupPrinted = async (pageReq: number) => {
  //   try {
  //     const payload: IReqGroupByStatus = {
  //       status: STATUS_ORDER_GROUP.PRINTED_GROUP,
  //       page: pageReq,
  //       per_page: 10,
  //       group_types: ` ${GROUP_ORDER_TYPE.ONLY_ONE_ORDER},${GROUP_ORDER_TYPE.MULTI_ORDER}`,
  //     };
  //     const result = await apiGetOrderGroup(payload);
  //     if (result?.data) {
  //       if (isNumber(result.data.total) && isArray(result.data.items)) {
  //         return {
  //           data: result?.data.items,
  //           pageParam:
  //             result.data?.items.length > 0 && result.data.items.length > 10
  //               ? pageReq + 1
  //               : -1,
  //         };
  //       }
  //     }
  //     return {
  //       data: [] as IOrderGroup[],
  //       pageParam: -1,
  //     };
  //   } catch (error) {
  //     enqueueSnackbar(
  //       (error as Error)?.message || "onOrderGroupPrinted error",
  //       {
  //         variant: "error",
  //       }
  //     );
  //     return {
  //       data: [] as IOrderGroup[],
  //       pageParam: -1,
  //     };
  //   }
  // };

  const onUpdateOrderGroup = async (
    idGroup: number,
    data: IReqUpdateOrderPrinted
  ) => {
    let status = true;
    try {
      setLoading(true);
      const result = await apiUpdateOrderGroup(idGroup, data);
      if (result.data) {
        enqueueSnackbar(translate("orders.orderPrintingList.success.done"));
      } else {
        enqueueSnackbar(translate("orders.orderPrintingList.error.done"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onUpdateOrderGroup error", {
        variant: "error",
      });
      status = false;
    } finally {
      setLoading(false);
    }
    return status;
  };

  const onStoreMultiOrder = async (
    idGroup: number,
    groupType: GROUP_ORDER_TYPE,
    orderNo: string,
    ids: number[],
    userName: string
  ) => {
    let status = true;
    // mặc định là các đơn 1 group là 1 đơn
    let isExistManyOrder = false;
    try {
      setLoading(true);
      if (groupType === GROUP_ORDER_TYPE.ONLY_ORDER_MULTI_GROUP) {
        // đơn nhiều bài chỉ còn đúng 1 bài hiện tại để lưu kho thì cho chuyển đơn đó sang status lưu kho
        isExistManyOrder = await checkOrdersByGroup(orderNo, idGroup);
      }
      const result = await apiUpdateOrderGroup(idGroup, {
        status: STATUS_ORDER_GROUP.DONE_GROUP,
      });
      // sau khi chuyển status group thành công và chỉ có 1 đơn duy nhất thì chuyển sang lưu kho
      if (!isExistManyOrder && result.data) {
        const payload: IReqUpdateMultiOrder = {
          order_ids: ids,
          status: ORDER_STATUS_NAME.STORED,
          notes: `${userName} đã lưu kho`,
        };
        await apiUpdateMultiOrderByOrderStatus(payload);
      }
      if (result.data) {
        enqueueSnackbar(translate("orders.orderPrinted.success.assign"));
      } else {
        enqueueSnackbar(translate("orders.orderPrinted.error.assign"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onStoreMultiOrder error", {
        variant: "error",
      });
      status = false;
    } finally {
      setLoading(false);
    }
    return status;
  };

  const onGroupListByOrder = async (
    pageReq: number,
    status: STATUS_ORDER_GROUP
  ) => {
    try {
      const payload: IReqGroupByStatus = {
        status,
        page: pageReq,
        per_page: 10,
      };
      const result = await apiGetGroupByOrder(payload);
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          return {
            data: result?.data.items,
            pageParam:
              result.data?.items.length > 0 && result.data.items.length > 10
                ? pageReq + 1
                : -1,
          };
        }
      }
      return {
        data: [] as IGroupByOrder[],
        pageParam: -1,
      };
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message ||
          `onGroupListByOrder error by status ${status}`,
        {
          variant: "error",
        }
      );
      return {
        data: [] as IGroupByOrder[],
        pageParam: -1,
      };
    }
  };

  const checkOrdersByGroup = async (orderNo: string, idOrderGroup: number) => {
    let isManyExist = true;
    const payload: IReqGroupByStatus = {
      status: STATUS_ORDER_GROUP.PRINTED_GROUP,
      order_no: orderNo,
      page: 1,
      per_page: 5,
    };
    const result = await apiGetOrderGroup(payload);
    if (result.data && result.data?.items && result.data?.items?.length === 1) {
      isManyExist = false;
    }
    return isManyExist;
  };

  const onCompleteOrderGroup = async (
    idGroup: number,
    data: FormValuesGroupProps
  ) => {
    let isSuccess = false;
    try {
      if (data.filename instanceof File) {
        const result = await apiUploadImageGroup(idGroup, {
          filename: data.filename.name,
        });
        if (result.data && result.data?.upload_url) {
          const resultUpload = await uploadImageToAws(
            result.data.upload_url,
            data.filename
          );
          if (!resultUpload) {
            enqueueSnackbar(
              "Upload hình ảnh thất bại, vui lòng cập nhật lại hình ảnh"
            );
            isSuccess = false;
          }
          isSuccess = true;
        }
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar((error as Error)?.message || "createOrder error", {
        variant: "error",
      });
      isSuccess = false;
    }
    return isSuccess;
  };
  return {
    onCreateGroupDraftOrder,
    onRejectMultiOrder,
    onUpdateOrderGroup,
    onStoreMultiOrder,
    onOrderGroupByStatus,
    loading,
    checkOrdersByGroup,
    onCompleteOrderGroup,
    onGroupListByOrder,
  };
};
export default useOrderGroup;
