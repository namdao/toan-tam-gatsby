import { useState } from "react";
import { IResponseType } from "constant/commonType";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import {
  apiAddPaper,
  apiDeletePaper,
  apiGetPaperList,
  apiUpdatePaper,
} from "../redux/api";
import { IPaperType, IReqPaper } from "../redux/types";
import { useAppDispatch } from "store";
import { paperTypeActions } from "../redux/slice";
import { useLocales } from "locales";

export const usePaperTypes = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const onGetPaperList = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IPaperType[]> = await apiGetPaperList();
      if (result?.data && isArray(result.data)) {
        dispatch(paperTypeActions.setPaperListSuccess(result.data));
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onGetPaperList error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const onAddNewPaper = async (payload: IReqPaper): Promise<boolean> => {
    let status = true;
    try {
      const result: IResponseType<IPaperType> = await apiAddPaper(payload);
      if (result?.data) {
        enqueueSnackbar(translate("paper.success.paperAdd"));
      } else {
        status = false;
        enqueueSnackbar(translate("paper.error.paperAdd"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddNewPaper error", {
        variant: "error",
      });
    }
    return status;
  };
  const onUpdatePaper = async (id: number, payload: IReqPaper) => {
    let status = true;
    try {
      const result: IResponseType<IPaperType> = await apiUpdatePaper(
        id,
        payload
      );
      if (result?.data) {
        enqueueSnackbar(translate("paper.success.paperUpdate"));
      } else {
        status = false;
        enqueueSnackbar(translate("paper.error.paperUpdate"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdatePaper error", {
        variant: "error",
      });
    }
    return status;
  };
  const onDeletePaper = async (id: number) => {
    let status = true;
    try {
      const result: IResponseType<IPaperType> = await apiDeletePaper(id);
      if (result?.data) {
        enqueueSnackbar(translate("paper.success.paperDelete"));
      } else {
        status = false;
        enqueueSnackbar(translate("paper.error.paperDelete"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onDeletePaper error", {
        variant: "error",
      });
    }
    return status;
  };

  return {
    loading,
    onDeletePaper,
    onUpdatePaper,
    onAddNewPaper,
    onGetPaperList,
  };
};
