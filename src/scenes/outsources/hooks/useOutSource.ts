import { useState } from "react";
import { IResponseType } from "constant/commonType";
import { useSnackbar } from "notistack";
import {
  IOutSource,
  IReqAddOutSource,
  IResOutSourceType,
} from "../redux/types";
import { useLocales } from "locales";
import {
  apiAddOutSource,
  apiDeleteOutSource,
  apiGetOutSourceList,
  apiUpdateOutSource,
} from "../redux/api";
import { compareIdDesc } from "utils/utility";
import { useAppDispatch } from "store";
import { outsourceActions } from "../redux/slice";

export const useOutSource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const [outsourceList, setOutSourceList] = useState<IOutSource[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const onGetOutSourceListForOtherPage = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResOutSourceType> =
        await apiGetOutSourceList();
      if (result?.data) {
        let dataCombine: IOutSource[] = [];
        const keysCat = Object.keys(result.data);
        keysCat.forEach((e) => {
          const listByParent = result?.data?.[e] || [];
          dataCombine = dataCombine.concat(listByParent);
        });
        const listOutSourceParse = dataCombine.map((e) => {
          return {
            ...e,
            label: e.name,
          };
        });
        const listFinalOutsource = [
          ...[
            {
              id: 0,
              label: "Không cán màng",
              group: "Gia công khác",
              max_select: 1,
              name: "Không cán màng",
            },
          ],
          ...listOutSourceParse,
        ];
        dispatch(outsourceActions.setOutsourceSuccess(listFinalOutsource));
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onGetOutSourceListForOtherPage error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const onGetOutSourceList = async (action: "idle" | "refresh") => {
    try {
      action === "idle" && setLoading(true);
      const result: IResponseType<IResOutSourceType> =
        await apiGetOutSourceList();
      if (result?.data) {
        const dataParse = Object.entries(result.data)
          .flat()
          .filter((e) => Array.isArray(e))
          .flat()
          .map((f) => ({
            // @ts-ignore
            ...f,
            isNew: false,
          }));
        const dataSort = dataParse.sort(compareIdDesc);
        // @ts-ignore
        setOutSourceList(dataSort);
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
      action === "idle" && setLoading(false);
    }
  };

  const onAddNewOutSource = async (
    payload: IReqAddOutSource
  ): Promise<boolean> => {
    let status = true;
    try {
      const result: IResponseType<IResOutSourceType> = await apiAddOutSource(
        payload
      );
      if (result?.data) {
        enqueueSnackbar(translate("outsource.success.outsourceAdd"));
      } else {
        status = false;
        enqueueSnackbar(translate("outsource.error.outsourceAdd"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddNewOutSource error", {
        variant: "error",
      });
    }
    return status;
  };
  const onUpdateOutSource = async (id: number, payload: IReqAddOutSource) => {
    let status = true;
    try {
      const result: IResponseType<IResOutSourceType> = await apiUpdateOutSource(
        id,
        payload
      );
      if (result?.data) {
        enqueueSnackbar(translate("outsource.success.outsourceUpdate"));
      } else {
        status = false;
        enqueueSnackbar(translate("outsource.error.outsourceUpdate"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdateOutSource error", {
        variant: "error",
      });
    }
    return status;
  };
  const onDeleteOutSource = async (id: number) => {
    let status = true;
    try {
      const result: IResponseType<IResOutSourceType> = await apiDeleteOutSource(
        id
      );
      if (result?.data) {
        enqueueSnackbar(translate("outsource.success.outsourceDelete"));
      } else {
        status = false;
        enqueueSnackbar(translate("outsource.error.outsourceDelete"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onDeleteOutSource error", {
        variant: "error",
      });
    }
    return status;
  };
  return {
    loading,
    outsourceList,
    onGetOutSourceList,
    setOutSourceList,
    onAddNewOutSource,
    onUpdateOutSource,
    onDeleteOutSource,
    onGetOutSourceListForOtherPage,
  };
};
