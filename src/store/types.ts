import { ReactChild, ReactFragment, ReactPortal } from "react";

export type Word = {
  wordId: string;
  word: string;
  type: string;
  meanOne: string;
  meanTwo?: string;
  meanThree?: string;
  rating: number;
  note?: string;
};

export type WordArr = {
  words: Word[];
};

export type User = {
  userId: string;
  login: string;
  password: string;
  words: Word[];
};

export type LocalStore = {
  isAuth: boolean;
  login: string;
  password: string;
  words: Word[];
  isConnect: boolean;
};

export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
