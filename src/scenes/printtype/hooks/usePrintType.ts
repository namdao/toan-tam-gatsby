import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiGetPrintType } from "../redux/api";
import { IColor, IResPrintType } from "../redux/types";

export const usePrintType = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listPrintType, setListPrintType] = useState<IColor[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const onGetPrintTypes = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResPrintType> = await apiGetPrintType();
      if (result.data && result.data.color) {
        setListPrintType(result.data.color);
      } else {
        enqueueSnackbar(translate("printtype.error.printTypeList"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onGetPrintTypes error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    onGetPrintTypes,
    loading,
    listPrintType,
  };
};
