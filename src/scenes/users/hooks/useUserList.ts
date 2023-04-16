import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { apiGetUserList } from "../redux/api";
import { IResUser } from "../redux/types";

export const useUserList = () => {
  const { translate } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<IResUser[]>([]);
  const onGetUserList = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResUser[]> = await apiGetUserList();
      if (result.data) {
        setUserList(result.data);
      } else {
        enqueueSnackbar(translate("users.error.userList.message"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onGetUserList error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    onGetUserList,
    loading,
    userList,
  };
};
