import { useState } from "react";
import { IResponseType } from "constant/commonType";
import { useSnackbar } from "notistack";
import { IOutSource, IResOutSourceType } from "../redux/types";
import { useLocales } from "locales";
import { apiGetOutSourceList } from "../redux/api";

export const useOutSource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { translate } = useLocales();
  const [outsourceList, setOutSourceList] = useState<IOutSource[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const onGetOutSourceList = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResOutSourceType> =
        await apiGetOutSourceList();
      if (result?.data) {
        const dataParse = Object.entries(result.data)
          .flat()
          .filter((e) => Array.isArray(e))
          .flat();
        // @ts-ignore
        setOutSourceList(dataParse);
      } else {
        enqueueSnackbar(translate("outsource.error.outsourceList"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onGetOutSourceList error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    outsourceList,
    onGetOutSourceList,
  };
};
