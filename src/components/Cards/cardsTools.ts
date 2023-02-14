import { Word } from "./../../store/types";
import { getRndInteger, shuffle } from "../../tools/random";
import { sampleWordStart } from "../../store/sample";
import { CardWordsQuiz } from "../../store/interface";

export async function getCardWords(db: Word[]): Promise<CardWordsQuiz> {
  let filtredUserWordsRating = db.filter((word) => word.rating !== 7);

  if (filtredUserWordsRating.length === 0) {
    return {} as CardWordsQuiz;
  } else {
    let CardWordsQuiz = {} as CardWordsQuiz;

    let currentUserWords = db;

    CardWordsQuiz.hiddenWord = await getQuestWord(currentUserWords, rndNumber);

    let mockWordsArr = getMockArray(
      CardWordsQuiz.hiddenWord.wordId,
      currentUserWords
    );

    CardWordsQuiz.mockW01 = mockWordsArr[0];
    CardWordsQuiz.mockW02 = mockWordsArr[1];
    CardWordsQuiz.mockW03 = mockWordsArr[2];

    CardWordsQuiz.mockArr = Object.values(CardWordsQuiz);

    CardWordsQuiz.mockArr = shuffle([...CardWordsQuiz.mockArr]);

    const starsArr = getStarsArr(CardWordsQuiz.hiddenWord.rating);
    CardWordsQuiz.stars = starsArr;
    CardWordsQuiz.answer = false;

    return CardWordsQuiz;
  }
}

export function getStarsArr(num: number): Array<boolean> {
  let starsArr = [];
  for (let index = 0; index < num; index++) {
    starsArr.push(true);
  }
  while (starsArr.length < 7) {
    starsArr.push(false);
  }
  return starsArr;
}

function getMockArray(hiddenWordId: string, currentUserWords: Word[]) {
  // получвем массив мокавых слов
  let arr = [] as Word[];
  while (arr.length !== 3) {
    let mockW = getMockWords(hiddenWordId, currentUserWords);
    if (hiddenWordId !== mockW.wordId) {
      let x = arr.some((word) => word.wordId === mockW.wordId);
      if (!x) {
        arr.push(mockW);
      }
    }
  }
  return arr;
}

function getMockWords(hiddenWordId: string, currentUserWords: Word[]): Word {
  // выбираем фейк слово
  let mockWord = currentUserWords[rndNumber(currentUserWords.length)];

  if (mockWord.wordId === hiddenWordId) {
    getMockWords(hiddenWordId, currentUserWords);
  }
  return mockWord;
}

async function getQuestWord(
  //выбор слова на загадку
  currentUserWords: Word[],
  rndNumber: any
): Promise<Word> {
  // вібираем какое слово загадать

  let questWord =
    currentUserWords[rndNumber(currentUserWords.length)] || sampleWordStart;
  if (questWord.rating >= 7) {
    return await getQuestWord(currentUserWords, rndNumber);
  }
  return questWord;
}

//рендом индекс слова из массива слов юзера
const rndNumber = (toNum: number): number => {
  return getRndInteger(0, toNum - 1);
};
