import { Word } from "./../../store/types";
import moment from "moment";

//time add word
export const dateWord = (data: string) => {
  var date = Number(data.slice(5));
  return moment(date).format("MMM Do YY, h:mm a");
};

export const getFindWord = (e: any, wordsArr: Word[]): Word[] => {
  console.log("getFindWord");
  let filteredArr: Word[] = [];
  let findWord = e.target.value;
  if (findWord.length) {
    let reg = new RegExp(`^${findWord.toLowerCase()}`);
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

//sort
export const getSortedArr = (sort: string, wordsArr: Word[]): Word[] => {
  let sortedWords: Word[] = [];
  if (sort === "wordUp") {
    sortedWords = [...wordsArr].sort((a: Word, b: Word) =>
      a.word.localeCompare(b.word)
    );
  }
  if (sort === "wordDown") {
    sortedWords = [...wordsArr].sort((a: Word, b: Word) =>
      b.word.localeCompare(a.word)
    );
  }
  if (sort === "rating") {
    sortedWords = [...wordsArr].sort((a: Word, b: Word) => b.rating - a.rating);
  }
  if (sort === "dateUp") {
    sortedWords = [...wordsArr].sort(
      (a: Word, b: Word) =>
        Number(b.wordId.slice(5)) - Number(a.wordId.slice(5))
    );
  }
  if (sort === "dateDown") {
    sortedWords = [...wordsArr].sort(
      (a: Word, b: Word) =>
        Number(a.wordId.slice(5)) - Number(b.wordId.slice(5))
    );
  }
  return sortedWords;
};
