import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userAuthinitialState = {
  isAuth: boolean;
  login: string;
  password: string;
  isConnect: boolean;
  isSound?: boolean;
};

const initialState: userAuthinitialState = {
  isAuth: false,
  login: "",
  password: "",
  isConnect: false,
  isSound: true,
};

const userAuthorizationSlice = createSlice({
  name: "userAuthorization",
  initialState: initialState,
  reducers: {
    isLogin(state, action: PayloadAction<userAuthinitialState>) {
      state.isAuth = action.payload.isAuth;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.isConnect = true;
    },
    logOut(state) {
      state.isAuth = false;
      state.login = "";
      state.password = "";
    },
    isConnect(state, action) {
      state.isConnect = action.payload.isConnect;
    },
    isSound(state) {
      state.isSound ? (state.isSound = false) : (state.isSound = true);
    },
  },
});

export const { isLogin, logOut, isConnect, isSound } =
  userAuthorizationSlice.actions;

export default userAuthorizationSlice.reducer;
