import { Word } from "./types";

export interface CardWordsQuiz {
  hiddenWord: Word;
  mockW01: Word;
  mockW02: Word;
  mockW03: Word;
  mockArr: Word[];
  stars: Array<boolean>;
  answer: boolean;
}
