import { useState } from "react";
import { useSnackbar } from "notistack";
import { apiGetListNotification, apiReadNotification } from "../redux/api";
import { isArray } from "lodash";
import { IResponseType } from "constant/commonType";
import { IDataNoti } from "../redux/types";

export const useNotification = () => {
  const [listNotication, setListNotification] = useState<IDataNoti[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const getListNoti = async () => {
    try {
      const result: IResponseType<IDataNoti[]> = await apiGetListNotification();
      if (result.data && isArray(result.data)) {
        setListNotification(result.data);
      }
    } catch (error) {
      enqueueSnackbar((error as Error).message || "getListNoti fail", {
        variant: "error",
      });
    }
  };

  const readNoti = async (ids: number[]): Promise<boolean> => {
    try {
      const result: IResponseType<IDataNoti[]> = await apiReadNotification({
        ids,
      });
      if (result.data && isArray(result.data)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error).message || "readNot fail", {
        variant: "error",
      });
      return false;
    }
  };

  const readAllLocalNoti = () => {
    const notiLocal = listNotication.map((e) => {
      return {
        ...e,
        read: true,
      };
    });
    setListNotification(notiLocal);
  };
  return {
    getListNoti,
    readNoti,
    readAllLocalNoti,
    listNotication,
  };
};
