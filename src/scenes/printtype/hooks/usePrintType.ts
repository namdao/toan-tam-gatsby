import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useAppDispatch } from "store";
import { compareIdDesc } from "utils/utility";
import {
  apiAddPrintType,
  apiDeletePrintType,
  apiGetPrintType,
  apiUpdatePrintType,
} from "../redux/api";
import { printTypeActions } from "../redux/slice";
import { IColor, IReqPrintType, IResPrintType } from "../redux/types";

export const usePrintType = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listPrintType, setListPrintType] = useState<IColor[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const onGetPrintTypesAnotherPage = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResPrintType> = await apiGetPrintType();
      if (result.data && result.data.color) {
        const dataSort = result.data.color.sort(compareIdDesc);
        dispatch(printTypeActions.setPrintTypeSuccess(dataSort));
      } else {
        enqueueSnackbar(translate("printtype.error.printTypeList"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onGetPrintTypesAnotherPage error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };
  const onGetPrintTypes = async (action: "idle" | "refresh") => {
    try {
      action === "idle" && setLoading(true);
      const result: IResponseType<IResPrintType> = await apiGetPrintType();
      if (result.data && result.data.color) {
        const dataSort = result.data.color.sort(compareIdDesc);
        setListPrintType(dataSort);
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
      action === "idle" && setLoading(false);
    }
  };

  const onAddPrintType = async (payload: IReqPrintType): Promise<boolean> => {
    let status = true;
    try {
      const result: IResponseType<IResPrintType> = await apiAddPrintType(
        payload
      );
      if (result?.data) {
        enqueueSnackbar(translate("printtype.success.printTypeAdd"));
      } else {
        status = false;
        enqueueSnackbar(translate("printtype.error.printTypeAdd"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddPrintType error", {
        variant: "error",
      });
    }
    return status;
  };
  const onUpdatePrintType = async (id: number, payload: IReqPrintType) => {
    let status = true;
    try {
      const result: IResponseType<IResPrintType> = await apiUpdatePrintType(
        id,
        payload
      );
      if (result?.data) {
        enqueueSnackbar(translate("printtype.success.printTypeUpdate"));
      } else {
        status = false;
        enqueueSnackbar(translate("printtype.error.printTypeUpdate"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdatePrintType error", {
        variant: "error",
      });
    }
    return status;
  };
  const onDeletePrintType = async (id: number) => {
    let status = true;
    try {
      const result: IResponseType<IReqPrintType> = await apiDeletePrintType(id);
      if (result?.data) {
        enqueueSnackbar(translate("printtype.success.printTypeDelete"));
      } else {
        status = false;
        enqueueSnackbar(translate("printtype.error.printTypeDelete"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onDeletePrintType error", {
        variant: "error",
      });
    }
    return status;
  };

  return {
    onGetPrintTypes,
    onAddPrintType,
    onDeletePrintType,
    onUpdatePrintType,
    loading,
    listPrintType,
    setListPrintType,
    onGetPrintTypesAnotherPage,
  };
};
