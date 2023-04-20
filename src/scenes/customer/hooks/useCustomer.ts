import { IResponseType } from "constant/commonType";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "store";
import { apiGetListCustomer } from "../redux/api";
import { customerActions } from "../redux/slice";
import { IResCustomerList } from "../redux/types";

export const useCustomer = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const getCustomerList = async () => {
    try {
      dispatch(customerActions.requestCustomer());
      const result: IResponseType<IResCustomerList> =
        await apiGetListCustomer();
      if (result.data && isArray(result.data.items)) {
        dispatch(customerActions.requestCustomerSuccess(result.data));
      } else {
        dispatch(customerActions.requestCustomerFailed());
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "getCustomerList error");
      dispatch(customerActions.requestCustomerFailed());
    }
  };
  return { getCustomerList };
};
