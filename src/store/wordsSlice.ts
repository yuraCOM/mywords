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
      //load all user words from FB in state and update all words in state
      state.words = action.payload.words;
    },
    addWord(state, action: PayloadAction<Word>) {
      state.words.unshift(action.payload);
    },
    clearWordsState(state) {
      state.words = [];
    },
    updateWords(state, action: PayloadAction<Word>) {
      state.words = state.words.map((w) => {
        if (w.wordId !== action.payload.wordId) {
          return w;
        }
        return action.payload;
      });
      // state.words = state.words.filter((w) => {
      //   return w.wordId !== action.payload.wordId;
      // });
      // state.words.push(action.payload);
    },
    deleteWords(state, action: PayloadAction<Word>) {
      state.words = state.words.filter((w) => {
        return w.wordId !== action.payload.wordId;
      });
    },
    reset7Stars(state) {
      state.words = state.words.map((w) => {
        if (Number(w.rating) === 7) {
          return { ...w, rating: 0 };
        }
        return w;
      });
    },
  },
});

export const {
  addWord,
  getUserWords,
  clearWordsState,
  updateWords,
  deleteWords,
  reset7Stars,
} = wordsSlice.actions;

export default wordsSlice.reducer;
