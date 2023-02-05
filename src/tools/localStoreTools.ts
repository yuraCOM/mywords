import { Word } from "./../store/types";
import { LocalStore } from "../store/types";

// update or write DB to localStore
export const updateLocalStoreWordsArr = (wordsArr: Word[]) => {
  let dataLocalStore: any = localStorage.getItem("MyWords");
  if (dataLocalStore !== null) {
    let data: LocalStore = JSON.parse(dataLocalStore);
    data.words = wordsArr;
    let newdata = JSON.stringify(data);
    localStorage.setItem("MyWords", newdata);
  }
};

export const updLocalStoreIsConnect = (status: boolean) => {
  let dataLocalStore: any = localStorage.getItem("MyWords");
  if (dataLocalStore !== null) {
    let data: LocalStore = JSON.parse(dataLocalStore);
    data.isConnect = status;
    let newdata = JSON.stringify(data);
    localStorage.setItem("MyWords", newdata);
  }
};
