import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userAuthinitialState = {
  isAuth: boolean;
  login: string;
  password: string;
  isConnect: boolean;
};

const initialState: userAuthinitialState = {
  isAuth: false,
  login: "",
  password: "",
  isConnect: false,
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
  },
});

export const { isLogin, logOut, isConnect } = userAuthorizationSlice.actions;

export default userAuthorizationSlice.reducer;
