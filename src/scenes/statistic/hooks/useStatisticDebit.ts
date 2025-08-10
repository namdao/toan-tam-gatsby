import { IResponseType } from "constant/commonType";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiGetTotalDebit, apiGetListCustomerDebit } from "../redux/api";
import {
  IResTotalDebit,
  IResCustomerDebit,
  ICustomerDebit,
  IReqTotalDebit,
} from "../redux/type";

export const useStatisticDebit = () => {
  const [dataDebit, setDataDebit] = useState<IResTotalDebit>({
    total_debit: 0,
    total_paid: 0,
  });
  const [listCustomerDebit, setListCustomerDebit] = useState<ICustomerDebit[]>(
    []
  );
  const { enqueueSnackbar } = useSnackbar();
  const getTotalDebit = async () => {
    try {
      const result: IResponseType<IResTotalDebit> = await apiGetTotalDebit();
      if (result.data) {
        setDataDebit(result.data);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "getTotalDebit error", {
        variant: "error",
      });
    }
  };
  const getListCustomerDebit = async (params?: IReqTotalDebit) => {
    try {
      const result: IResponseType<IResCustomerDebit> =
        await apiGetListCustomerDebit(params);
      if (result.data) {
        setListCustomerDebit(result.data.items);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "getTotalDebit error", {
        variant: "error",
      });
    }
  };
  return {
    getTotalDebit,
    getListCustomerDebit,
    dataDebit,
    listCustomerDebit,
  };
};
