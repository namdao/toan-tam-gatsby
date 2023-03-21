import { useState } from "react";
import { IResponseType } from "constant/commonType";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { apiGetPaperList } from "../redux/api";
import { IPaperType } from "../redux/types";
import { useAppDispatch } from "store";
import { paperTypeActions } from "../redux/slice";

export const usePaperTypes = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const onGetPaperList = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IPaperType[]> = await apiGetPaperList();
      if (result?.data && isArray(result.data)) {
        dispatch(paperTypeActions.setPaperListSuccess(result.data));
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onGetPaperList error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onGetPaperList,
  };
};
