import { FC } from "react";
import "./headerStyle.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ADD_NEW_WORD_ROUTE,
  AUTHORIZATION_ROUTE,
  CARDS_ROUTE,
  READ_WR_PHR_ROUTE,
  START_PAGE_ROUTE,
  USER_ROUTE,
} from "../../tools/constant";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isSound, logOut } from "../../store/userAuthorizationSlice";
import { clearWordsState } from "../../store/wordsSlice";

interface HeaderProps {
  isAuth: boolean;
}

const Header: FC<HeaderProps> = ({ isAuth }) => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.userAuthorization);

  const exitHandler = () => {
    dispatch(logOut());
    dispatch(clearWordsState());
    localStorage.removeItem("MyWords");
  };

  return (
    <div className="d-flex justify-content-center flex-wrap header pt-2 pb-2 ">
      <Link to={START_PAGE_ROUTE}>
        <Button variant="outline-success">Info</Button>
      </Link>

      {!isAuth && (
        <Link to={AUTHORIZATION_ROUTE}>
          <Button variant="outline-success">LogIn</Button>
        </Link>
      )}
      {isAuth && (
        <>
          <Link to={ADD_NEW_WORD_ROUTE}>
            <Button variant="outline-success">Add Word & Pharase</Button>
          </Link>
          <Link to={CARDS_ROUTE}>
            <Button variant="outline-success">Cards</Button>
          </Link>
          <Link to={READ_WR_PHR_ROUTE}>
            <Button variant="outline-success">Word & Pharase</Button>
          </Link>
          <Link to={USER_ROUTE}>
            <Button variant="outline-success">
              User: <b>{userAuth.login}</b>
            </Button>
          </Link>
          <Button
            className="soundBtn"
            variant="outline-success"
            onClick={() => dispatch(isSound())}
          >
            {userAuth.isSound ? (
              <img src={require("../../assets/muteOn.png")} alt="mute" />
            ) : (
              <img src={require("../../assets/mute.png")} alt="mute" />
            )}
          </Button>
          <Link to={AUTHORIZATION_ROUTE} onClick={() => exitHandler()}>
            <Button variant="outline-danger">Exit</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
