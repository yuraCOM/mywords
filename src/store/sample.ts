export const sampleWord = {
  wordId: "W-" + Date.now().toString(),
  word: "word",
  type: "wd", // wd - word, phr - phrase
  meanOne: "слово",
  meanTwo: "",
  meanThree: "",
  rating: 0,
  note: "",
};

export const sampleWordStart = {
  wordId: "0",
  word: "0",
  type: "0", // wd - word, phr - phrase
  meanOne: "0",
  meanTwo: "0",
  meanThree: "0",
  rating: 0,
  note: "0",
};

export const userNew = {
  userId: "User-" + Date.now().toString(),
  login: "00000",
  password: "00000",
  words: [sampleWord, sampleWord],
};

export const userNew2 = {
  userId: "User-" + Date.now().toString(),
  login: "11111",
  password: "11111",
  words: [sampleWord, sampleWord],
};
