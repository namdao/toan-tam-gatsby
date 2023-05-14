import { setDoc, collection, getDoc, doc } from "firebase/firestore";
import firebaseService from "../firebase";

export const addColection = async () => {
  try {
    // const app = firebaseService.getApp();
    // if (app) {
    //   const docRef = doc(app, "users", "namdao");
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log(docSnap.data());
    //   }
    //   const docNew = doc(app, "users", "aaa");
    //   const addocRef = await setDoc(docNew, {
    //     orderProcessingColumns: ["aaa", "bbb"],
    //   });
    //   console.log(docRef.id);
    // }
  } catch (error) {
    console.error(error);
  }
};
