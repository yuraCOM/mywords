import React, { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import {
  readOneUserFromDB,
  updWordInFireBase,
} from "./FireBase/FireBaseService";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { LocalStore } from "./store/types";
import { isConnect, isLogin } from "./store/userAuthorizationSlice";
import { getUserWords } from "./store/wordsSlice";
import {
  updateLocalStoreWordsArr,
  updLocalStoreIsConnect,
} from "./tools/localStoreTools";

function App() {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.userAuthorization);
  //words state
  const wordsArr = useAppSelector((state) => state.words.words);

  async function fetchData(data: LocalStore) {
    // читаем из локал стора данніе юзера
    // делаем запрос в облоко за его данными и берем его словарь
    //и сохраняем в стор
    const user: any = await readOneUserFromDB(data.login, data.password);
    if (!user) {
      dispatch(isConnect({ isConnect: false }));
      updLocalStoreIsConnect(false);
    } else {
      dispatch(isConnect({ isConnect: true }));
      dispatch(getUserWords({ words: user.words }));
      updLocalStoreIsConnect(true);
    }
  }

  useEffect(() => {
    let dataLocalStore: string | null = localStorage.getItem("MyWords");

    if (dataLocalStore) {
      if (dataLocalStore === null) {
        localStorage.setItem("MyWords", JSON.stringify({}));
      } else {
        let data: LocalStore = JSON.parse(dataLocalStore);
        dispatch(
          isLogin({
            isAuth: data.isAuth,
            login: data.login,
            password: data.password,
            isConnect: false,
          })
        );
        fetchData(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // зависимость от wordsArr - при его изменении - автоматом обновляется локал стор слов
    // и записівается обновленній стор в базу в облаке
    updateLocalStoreWordsArr(wordsArr);
    updWordInFireBase(userAuth.login, wordsArr);
  }, [userAuth, wordsArr]);

  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <Header isAuth={userAuth.isAuth} />
        <AppRouter isAuth={userAuth.isAuth} />
      </div>
    </BrowserRouter>
  );
}

export default App;
