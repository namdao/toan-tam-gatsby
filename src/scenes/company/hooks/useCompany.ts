import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiGetListCompanies } from "../redux/api";
import { IResCompanies } from "../redux/types";

export const useCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listCompany, setListCompany] = useState<IResCompanies[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const onGetCompanies = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const result: IResponseType<IResCompanies[]> = await apiGetListCompanies(
        signal
      );
      if (result.data && isArray(result.data)) {
        setListCompany(result.data);
      } else {
        enqueueSnackbar(translate("company.error.companyFail"), {
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

  return {
    onGetCompanies,
    loading,
    listCompany,
  };
};
