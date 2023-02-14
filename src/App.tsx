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
  const user = useAppSelector((state) => state.userAuthorization);

  //words state
  const wordsArr = useAppSelector((state) => state.words.words);

  async function fetchData(data: LocalStore) {
    if (data.login) {
      // читаем из локал стора данніе юзера
      // делаем запрос в облоко FB за его данными и берем его словарь from FireBase
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
    } else {
      return false;
    }
  }

  useEffect(() => {
    let dataLocalStore: any = localStorage.getItem("MyWords");

    if (dataLocalStore === null) {
      localStorage.setItem("MyWords", JSON.stringify({}));
    } else {
      dataLocalStore = JSON.parse(dataLocalStore);
      dispatch(
        isLogin({
          isAuth: dataLocalStore.isAuth,
          login: dataLocalStore.login,
          password: dataLocalStore.password,
          isConnect: false,
        })
      );
      fetchData(dataLocalStore);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.isAuth && user.isConnect) {
      // console.log("useEffect APP ", wordsArr);
      updateLocalStoreWordsArr(wordsArr);
      updWordInFireBase(user.login, wordsArr);
    }
    // зависимость от wordsArr - при его изменении - автоматом обновляется локал стор слов
    // и записівается обновленній стор в базу в облаке
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsArr]);

  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      <div className="App container-fluid">
        <Header isAuth={user.isAuth} />
        {/* <Spinner animation="border" variant="success" /> */}
        <div className="routers">
          <AppRouter isAuth={user.isAuth} />
        </div>
      </div>
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default App;
