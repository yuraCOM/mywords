import moment from "moment";
import { Word } from "../../store/types";

//time add word
export const dateWord = (data: string) => {
  var date = Number(data.slice(5));
  return moment(date).format("MMM Do YY, h:mm a");
};

export const getFindWord = (e: any, wordsArr: Word[]): Word[] => {
  let filteredArr: Word[] = [];
  let findWord = e.target.value;
  if (findWord.length) {
    var reg = new RegExp(`^${findWord.toLowerCase()}`);
    wordsArr.forEach((item) => {
      if (reg.test(item.word.toLowerCase())) {
        filteredArr.push(item);
      }
    });
  }
  if (!findWord.length) {
    filteredArr = wordsArr;
  }
  return filteredArr;
};
