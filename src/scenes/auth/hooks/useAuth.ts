import { IResponseType } from "constant/commonType";
import { isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "store";
import { apiLogin, apiLogout } from "../redux/api";
import { authActions, IProfile } from "../redux/slice";
import { IRequestLogin, IResLogin } from "../redux/types";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSignIn = async (payload: IRequestLogin) => {
    try {
      const result: IResponseType<IResLogin> = await apiLogin(payload);
      if (result?.errors) {
        payload.callbackError &&
          payload.callbackError(result?.errors?.messages);
      } else if (result?.data) {
        const { token, user } = result.data || {};
        if (token) {
          dispatch(authActions.setTokenSuccess(token));
        }
        if (!isEmpty(user)) {
          const profile: IProfile = {
            firstName: user.first_name,
            lastName: user.last_name,
            id: user.id,
            roles: user.roles,
            userName: user.username,
            email: user.email,
            createdTime: user.created_time,
          };
          dispatch(authActions.setProfileSuccess(profile));
        }
      }
    } catch (error) {
      payload.callbackError &&
        payload.callbackError((error as Error)?.message || "Không xác định");
    }
  };

  const onSignOut = async () => {
    try {
      const result = await apiLogout();
      if (result.data) {
        dispatch(authActions.resetData());
        enqueueSnackbar("Logout success", { variant: "success" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };
  return {
    onSignIn,
    onSignOut,
  };
};
export default useAuth;
