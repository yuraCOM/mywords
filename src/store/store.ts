import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";
import userAuthorizationSlice from "./userAuthorizationSlice";
import wordsSlice from "./wordsSlice";

export const store = configureStore({
  reducer: {
    words: wordsSlice,
    userAuthorization: userAuthorizationSlice,
    cards: cardsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
