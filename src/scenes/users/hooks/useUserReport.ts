import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { apiGetReportEmployee } from "../redux/api";
import { IReqEmployeeReport, IResEmployeeReport } from "../redux/types";

export const useReportUser = () => {
  const { translate } = useLocales();
  const [loadingMonth, setLoadingMonth] = useState<boolean>(false);
  const [loadingYear, setLoadingYear] = useState<boolean>(false);
  const [dataReportOfMonth, setDataReportOfMonth] =
    useState<IResEmployeeReport | null>(null);
  const [dataReportOfYear, setDataReportOfYear] =
    useState<IResEmployeeReport | null>(null);
  const onGetReportSummaryByUser = async (
    params: IReqEmployeeReport,
    type: "month" | "year",
    signal: AbortSignal
  ) => {
    try {
      if (type === "month") setLoadingMonth(true);
      if (type === "year") setLoadingYear(true);
      const result: IResponseType<IResEmployeeReport[]> =
        await apiGetReportEmployee(params, signal);
      if (result?.data && result?.data.length > 0) {
        if (type === "month") setDataReportOfMonth(result.data[0]);
        if (type === "year") setDataReportOfYear(result.data[0]);
      } else {
        enqueueSnackbar(translate("users.error.reportSummary.message"), {
          variant: "error",
        });
      }
    } catch (error) {
      if ((error as Error)?.message === "canceled") {
        return;
      }
      enqueueSnackbar(
        (error as Error)?.message || "onGetReportSummaryByUser error",
        {
          variant: "error",
        }
      );
    } finally {
      if (type === "month") setLoadingMonth(false);
      if (type === "year") setLoadingYear(false);
    }
  };
  return {
    onGetReportSummaryByUser,
    loadingMonth,
    loadingYear,
    dataReportOfMonth,
    dataReportOfYear,
  };
};
