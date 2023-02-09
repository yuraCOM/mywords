import { CardWordsQuiz } from "./interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cards: {} as CardWordsQuiz,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    addCards(state, action: PayloadAction<CardWordsQuiz>) {
      state.cards = action.payload;
    },
    updateCardsAnswer(state, action: PayloadAction<boolean>) {
      state.cards.answer = action.payload;
    },

    // addWord(state, action: PayloadAction<Word>) {
    //   state.words.push(action.payload);
    // },
    clearCARDSstate(state) {
      state.cards = {} as CardWordsQuiz;
      // console.log(state.cards);
      console.log("clear", state.cards);
    },
  },
});

// console.log(wordsSlice.getInitialState());

export const { addCards, clearCARDSstate, updateCardsAnswer } =
  cardsSlice.actions;

export default cardsSlice.reducer;
