import { Word } from "../store/types";

// первая буква заглавная
export function ucFirst(str: string) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

export const meanWords = (word: Word): Array<string> => {
  let arr: Array<any> = [];
  if (word.meanOne) {
    arr.push(ucFirst(word.meanOne));
  }
  if (word.meanTwo) {
    arr.push(", " + ucFirst(word.meanTwo));
  }
  if (word.meanThree) {
    arr.push(", " + ucFirst(word.meanThree));
  }
  return arr;
};
