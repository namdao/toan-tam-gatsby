import { setDoc, updateDoc, collection, getDoc, doc } from "firebase/firestore";
import firebaseService from "../firebase";

export enum OrderFeature {
  PROCESSING = "OrderProcessing",
  STORED = "OrderStored",
  WAITING_PRINT = "OrderWaitingPrint",
  NEED_CHECK = "OrderNeedtCheck",
  NEED_COLLECT = "OrderNeedCollect",
  NEED_CONFIRM = "OrderNeedConfirm",
  PRINTING = "OrderPrinting",
  SEARCH = "OrderSearch",
  DEBIT_COMPAY_DETAIL = "DebitCompanyDetail",
}
type IPropsAddColumn = {
  user: string;
  typeStored: OrderFeature;
  dataColumn: Record<string, boolean>;
};
export const addTableColumn = async (data: IPropsAddColumn) => {
  try {
    const app = firebaseService.getApp();
    if (app) {
      const docRef = doc(app, "users", data.user);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        await setDoc(docRef, {
          [data.typeStored]: data.dataColumn,
        });
      } else {
        await updateDoc(docRef, {
          [data.typeStored]: data.dataColumn,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

type IPropsGetColumn = {
  user: string;
  type: OrderFeature;
};
export const getTableColumn = async (
  data: IPropsGetColumn
): Promise<Record<string, boolean>> => {
  let dataColumnStored = {};
  try {
    const app = firebaseService.getApp();
    if (app) {
      const docRef = doc(app, "users", data.user);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const dataColumn = docSnapshot.data();
        if (dataColumn[data.type]) {
          dataColumnStored = dataColumn[data.type];
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
  return dataColumnStored;
};
