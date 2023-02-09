import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word, WordArr } from "./types";

const initialState: WordArr = {
  words: [],
};

const wordsSlice = createSlice({
  name: "words",
  initialState: initialState,
  reducers: {
    getUserWords(state, action: PayloadAction<WordArr>) {
      //load all user words from FB in state
      state.words = action.payload.words;
    },
    addWord(state, action: PayloadAction<Word>) {
      state.words.push(action.payload);
    },
    clearWordsState(state) {
      state.words = [];
    },
    updateWords(state, action: PayloadAction<Word>) {
      state.words = state.words.filter((w) => {
        return w.wordId !== action.payload.wordId;
      });
      state.words.push(action.payload);
    },
    deleteWords(state, action: PayloadAction<Word>) {
      state.words = state.words.filter((w) => {
        return w.wordId !== action.payload.wordId;
      });
    },
  },
});

// console.log(wordsSlice.getInitialState());

export const {
  addWord,
  getUserWords,
  clearWordsState,
  updateWords,
  deleteWords,
} = wordsSlice.actions;

export default wordsSlice.reducer;
