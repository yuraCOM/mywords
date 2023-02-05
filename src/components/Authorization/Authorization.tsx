import { FC, useState } from "react";
import { Button } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom";
import {
  addOneUserInFireBase,
  readOneUserFromDB,
} from "../../FireBase/FireBaseService";
import {
  AUTHORIZATION_ROUTE,
  REGISTRATION_ROUTE,
  START_PAGE_ROUTE,
} from "../../tools/constant";
import { useAppDispatch } from "../../store/hooks";
import { isLogin } from "../../store/userAuthorizationSlice";
import { getUserWords } from "../../store/wordsSlice";
import "./authorizationStyle.css";
import { User } from "../../store/types";
import { infoAuthMsg, infoMsg } from "./AuthService";

const Authorization: FC = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const loginPageFlag = location.pathname === AUTHORIZATION_ROUTE;
  const regPageFlag = location.pathname === REGISTRATION_ROUTE;

  const history = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [comparePassword, setComparePassword] = useState("");

  const [info, setInfo] = useState({
    log: "",
    pw0: "",
    pw1: "",
  });

  const [infoAuth, setInfoAuth] = useState({
    log: "",
    pw0: "",
  });

  //auth
  async function handleSubmitForm(e: any): Promise<void> {
    e.preventDefault();
    if (!login) {
      infoAuthMsg.log = "Input Login";
      setInfoAuth(infoAuthMsg);
    }
    if (!password) {
      infoAuthMsg.pw0 = "Input Password";
      setInfoAuth(infoAuthMsg);
    } else {
      const user: any = await readOneUserFromDB(login, password);

      if (!user) {
        infoAuthMsg.log =
          "User does not exist! Check your login or register a new user!";
      }
      setInfoAuth(infoAuthMsg);
      if (user === "wrong password") {
        infoAuthMsg.pw0 = "Wrong password!";
      }
      setInfoAuth(infoAuthMsg);

      if (user.login === login && user.password === password) {
        dispatch(
          isLogin({
            isAuth: true,
            login: user.login,
            password: user.password,
            isConnect: true,
          })
        );
        dispatch(getUserWords({ words: user.words }));

        let data = JSON.stringify({
          isAuth: true,
          login: user.login,
          password: user.password,
          words: user.words,
          isConnect: true,
        });
        localStorage.setItem("MyWords", data);
        history(START_PAGE_ROUTE);
      }
    }
  }

  function regHandler(): void {
    clearInfoMsg();
    history(REGISTRATION_ROUTE);
  }

  //registration
  async function handleSubmitRegForm(e: any): Promise<void> {
    e.preventDefault();
    if (!login) {
      infoMsg.log = "Input Login";
    }
    if (!password) {
      infoMsg.pw0 = "Input Password";
    }
    if (!comparePassword) {
      infoMsg.pw1 = "Repeat Password";
    }
    const user: any = await readOneUserFromDB(login, password);
    if (user) {
      infoMsg.log = "This user is already registered";
    }
    if (password.length > 0 && password !== comparePassword) {
      alert("Passwords don't match");
    }
    setInfo(infoMsg);

    if (
      !user &&
      login.length > 0 &&
      password.length > 0 &&
      password === comparePassword
    ) {
      const newUser: User = {
        userId: "User-" + Date.now().toString(),
        login: login,
        password: password,
        words: [],
      };
      addOneUserInFireBase(newUser);
      history(AUTHORIZATION_ROUTE);
      clearInfoMsg();
    }
  }

  //clear
  const clearInfoMsg = () => {
    setLogin("");
    setPassword("");
    setComparePassword("");
    setInfo({
      log: "",
      pw0: "",
      pw1: "",
    });
    setInfoAuth({
      log: "",
      pw0: "",
    });
  };

  return (
    <div>
      <div className="auth">
        <form action="" className={loginPageFlag ? "log-form" : "reg-form"}>
          <h1>{loginPageFlag ? "Login Form" : "Registration Form"}</h1>
          {/* <hr /> */}
          <div className="formcontainer">
            <div className="container">
              <label htmlFor="uname">
                <strong>Username</strong>
              </label>
              {regPageFlag && <p className="info-reg">{info.log}</p>}
              {loginPageFlag && <p className="info-reg">{infoAuth.log}</p>}
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label htmlFor="psw">
                <strong>Password</strong>
              </label>
              {regPageFlag && <p className="info-reg">{info.pw0}</p>}
              {loginPageFlag && <p className="info-reg">{infoAuth.pw0}</p>}
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {regPageFlag && (
                <>
                  <label htmlFor="psw">
                    <strong>Repeat Password</strong>
                  </label>
                  <p className="info-reg">{info.pw1}</p>
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    name="psw"
                    required
                    value={comparePassword}
                    onChange={(e) => setComparePassword(e.target.value)}
                  />
                </>
              )}
              <button
                className="btn-submin"
                type="submit"
                onClick={(e) =>
                  loginPageFlag ? handleSubmitForm(e) : handleSubmitRegForm(e)
                }
              >
                {loginPageFlag ? "Login" : "Registration"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-3">
        {loginPageFlag && (
          <Button variant="warning" onClick={() => regHandler()}>
            Registration
          </Button>
        )}
      </div>
    </div>
  );
};

export default Authorization;
