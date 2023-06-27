import { useSnackbar } from "notistack";
import { parseToNumber } from "utils/formatNumber";
import { FormOrderValuesProps } from "../components/OrderNewEditForm";
import {
  apiCreateOrder,
  apiRequestUploadImg,
  apiRemoveImg,
  apiUpdateOrderCreate,
} from "../redux/api";
import {
  IQuickUpdateOrder,
  IReqCreateOrder,
  IResCreateOrder,
  IResUrlUpload,
} from "../redux/types";
import { IResponseType } from "constant/commonType";
import { useState } from "react";
import { uploadImageToAws } from "utils/imageHandler";
import { format } from "date-fns";
import { convertMethod } from "../helper/HandlerMethod";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";

const parseToOrderRequest = (data: FormOrderValuesProps) => {
  return {
    ...data,
    order_detail_notes: data.order_detail_notes,
    customer_id: data.customerInfo?.id || 0,
    print_type_ids: [data.print_type_ids?.id || 0],
    category_id: data?.category_id?.id || 0,
    paper_id: data.paper_id?.id || 0,
    template_number:
      typeof data.template_number === "string"
        ? parseToNumber(data?.template_number?.replaceAll(",", "") || "0")
        : data.template_number || 0,
    method: convertMethod(data.method),
    delivery_date: format(data.delivery_date, "yyyy-MM-dd"),
    outsource_ids: data.outsource_ids?.map((e) => e.id),
    quantity:
      typeof data.quantity === "string"
        ? parseToNumber(data?.quantity?.replaceAll(",", "") || "0")
        : data.quantity || 0,
    unit_price:
      typeof data.unit_price === "string"
        ? parseToNumber(data.unit_price?.replaceAll(",", "") || "0")
        : data.unit_price || 0,
    design_fee:
      typeof data.design_fee === "string"
        ? parseToNumber(data?.design_fee?.replaceAll(",", "") || "0")
        : data.design_fee || 0,
    deposite:
      typeof data.deposite === "string"
        ? parseToNumber(data?.deposite?.replaceAll(",", "") || "0")
        : data.deposite || 0,
    shipping_fee:
      typeof data.shipping_fee === "string"
        ? parseToNumber(data?.shipping_fee?.replaceAll(",", "") || "0")
        : data.shipping_fee || 0,
  };
};

export const useOrderCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isStatus, setStatus] = useState<
    "initial" | "loading" | "success" | "error"
  >("initial");
  const createOrder = async (data: FormOrderValuesProps) => {
    try {
      setStatus("loading");
      const dataOrder: IReqCreateOrder = parseToOrderRequest(data);
      const result: IResponseType<IResCreateOrder> = await apiCreateOrder(
        dataOrder
      );
      if (result.data) {
        if (data.image instanceof File && result?.data?.id) {
          const dataUpload: IResponseType<IResUrlUpload> =
            await apiRequestUploadImg(result.data.id, data.image.name);
          if (dataUpload.data && dataUpload.data.upload_url) {
            const resultUpload = await uploadImageToAws(
              dataUpload.data.upload_url,
              data.image
            );
            if (!resultUpload) {
              enqueueSnackbar(
                "Upload hình ảnh thất bại, vui lòng chỉnh sửa đơn để cập nhật lại hình ảnh"
              );
            }
          }
        }
        enqueueSnackbar("Cập nhật đơn thành công");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "createOrder error", {
        variant: "error",
      });
      setStatus("error");
    }
  };
  const updateOrder = async (data: FormOrderValuesProps) => {
    try {
      setStatus("loading");
      const dataOrder: IReqCreateOrder = parseToOrderRequest(data);
      if (!data.id) {
        setStatus("error");
        return;
      }
      const result: IResponseType<IResCreateOrder> = await apiUpdateOrderCreate(
        data.id,
        dataOrder
      );
      if (result.data) {
        if (data.image && data.image instanceof File) {
          // remove image old
          if (data?.imageList && data.imageList?.length > 0) {
            apiRemoveImg(data.id, data.imageList[0]);
          }
          // upload new image
          const dataUpload: IResponseType<IResUrlUpload> =
            await apiRequestUploadImg(data.id, data.image.name);
          if (dataUpload.data && dataUpload.data.upload_url) {
            const resultUpload = await uploadImageToAws(
              dataUpload.data.upload_url,
              data.image
            );
            if (!resultUpload) {
              enqueueSnackbar(
                "Upload hình ảnh thất bại, vui lòng chỉnh sửa đơn để cập nhật lại hình ảnh"
              );
            }
          }
        }
        enqueueSnackbar("Cập nhật đơn thành công");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "updateOrder error", {
        variant: "error",
      });
      setStatus("error");
    }
  };

  const quickUpdateOrder = async (data: IQuickUpdateOrder) => {
    try {
      setStatus("loading");
      if (!data.id) {
        setStatus("error");
        return;
      }
      const result: IResponseType<IResCreateOrder> = await apiUpdateOrderCreate(
        data.id,
        data
      );
      if (result.data) {
        enqueueSnackbar("Cập nhật đơn thành công");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "quickUpdateOrder error", {
        variant: "error",
      });
      setStatus("error");
    }
  };
  return {
    createOrder,
    updateOrder,
    quickUpdateOrder,
    isStatus,
  };
};
