import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useAppDispatch } from "store";
import {
  apiAddCompanies,
  apiGetListCompanies,
  apiUpdateCompanies,
} from "../redux/api";
import { companyActions } from "../redux/slice";
import { IReqAddCompany, IResCompanies } from "../redux/types";

export const useCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const onGetCompanies = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const result: IResponseType<IResCompanies[]> = await apiGetListCompanies(
        signal
      );
      if (result.data && isArray(result.data)) {
        dispatch(companyActions.requestCompanySuccess(result.data));
      } else {
        enqueueSnackbar(translate("company.error.companyList"), {
          variant: "error",
        });
      }
    } catch (error) {
      if ((error as Error)?.message === "canceled") {
        return;
      }
      enqueueSnackbar((error as Error)?.message || "onGetCompanies error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onAddCompany = async (data: IReqAddCompany): Promise<boolean> => {
    let status = true;
    try {
      setLoading(true);
      const result: IResponseType<IResCompanies[]> = await apiAddCompanies(
        data
      );
      if (result.data) {
        enqueueSnackbar(translate("company.success.companyAdd"), {
          variant: "success",
        });
      } else {
        enqueueSnackbar(translate("company.error.companyAdd"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddCompany error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
    return status;
  };
  const onUpdateCompany = async (
    id: number,
    data: IReqAddCompany
  ): Promise<boolean> => {
    let status = true;
    try {
      setLoading(true);
      const result: IResponseType<IResCompanies[]> = await apiUpdateCompanies(
        id,
        data
      );
      if (result.data) {
        enqueueSnackbar(translate("company.success.companyUpdate"), {
          variant: "success",
        });
      } else {
        enqueueSnackbar(translate("company.error.companyUpdate"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdateCompany error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
    return status;
  };
  return {
    onGetCompanies,
    onAddCompany,
    onUpdateCompany,
    loading,
  };
};
