import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { apiGetUserList, apiUpdateUser, apiAddUser } from "../redux/api";
import { IReqUpdateUser, IResUser } from "../redux/types";

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
  const onUpdateUser = async (idUser: number, payload: IReqUpdateUser) => {
    let isSuccess = true;
    try {
      setLoading(true);
      const result: IResponseType<IResUser[]> = await apiUpdateUser(
        idUser,
        payload
      );
      if (result.data) {
        enqueueSnackbar(translate("users.userUpdate.updateSuccess"));
      } else {
        enqueueSnackbar(translate("users.error.updateUser.message"), {
          variant: "error",
        });
        isSuccess = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onUpdateUser error", {
        variant: "error",
      });
      isSuccess = false;
    } finally {
      setLoading(false);
    }
    return isSuccess;
  };

  const onAddUser = async (payload: IReqUpdateUser) => {
    let isSuccess = true;
    try {
      setLoading(true);
      const result: IResponseType<IResUser[]> = await apiAddUser(payload);
      if (result.data) {
        enqueueSnackbar(translate("users.userAdd.createSuccess"));
      } else {
        enqueueSnackbar(translate("users.error.createUser.message"), {
          variant: "error",
        });
        isSuccess = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onAddUser error", {
        variant: "error",
      });
      isSuccess = false;
    } finally {
      setLoading(false);
    }
    return isSuccess;
  };
  return {
    onGetUserList,
    onUpdateUser,
    onAddUser,
    loading,
    userList,
  };
};
