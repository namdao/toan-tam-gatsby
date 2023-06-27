import { ICustomer, IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useAppDispatch } from "store";
import {
  apiAddCustomer,
  apiGetListCustomer,
  apiUpdateCustomer,
} from "../redux/api";
import { customerActions } from "../redux/slice";
import { IReqAddCustomer, IResCustomerList } from "../redux/types";

export const useCustomer = () => {
  const [loadingCustomer, setLoadingCustomer] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const getCustomerList = async (isData = false) => {
    try {
      setLoadingCustomer(true);
      if (!isData) {
        dispatch(customerActions.requestCustomer());
      }

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
    } finally {
      setLoadingCustomer(false);
    }
  };

  const onAddCustomer = async (data: IReqAddCustomer): Promise<boolean> => {
    let status = true;
    try {
      const result: IResponseType<ICustomer> = await apiAddCustomer(data);
      if (result.data) {
        enqueueSnackbar(translate("customer.success.customerAdd"));
      } else {
        enqueueSnackbar(translate("customer.error.customerAdd"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddCustomer error", {
        variant: "error",
      });
    }
    return status;
  };
  const onUpdateCustomer = async (
    id: number,
    data: IReqAddCustomer
  ): Promise<boolean> => {
    let status = true;
    try {
      const result: IResponseType<ICustomer> = await apiUpdateCustomer(
        id,
        data
      );
      if (result.data) {
        enqueueSnackbar(translate("customer.success.customerUpdate"), {
          variant: "success",
        });
      } else {
        enqueueSnackbar(translate("customer.error.customerUpdate"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdateCustomer error", {
        variant: "error",
      });
    } finally {
    }
    return status;
  };
  return { getCustomerList, onAddCustomer, onUpdateCustomer, loadingCustomer };
};
