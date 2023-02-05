import { Navigate } from "react-router-dom";
import Authorization from "./components/Authorization/Authorization";
import Answer from "./components/Cards/Answer";
import Cards from "./components/Cards/Cards";
import NewWordAddForm from "./components/AddNewWords/NewWordAdd";
import StartPage from "./components/StartPage/StartPage";
import User from "./components/User/User";
import WrPhrPage from "./components/WrPhrPage/WrPhrPage";
import {
  ADD_NEW_WORD_ROUTE,
  ANSWER_ROUTE,
  AUTHORIZATION_ROUTE,
  CARDS_ROUTE,
  READ_WR_PHR_ROUTE,
  REGISTRATION_ROUTE,
  START_PAGE_ROUTE,
  USER_ROUTE,
} from "./tools/constant";

export const authRoutes = [
  {
    path: START_PAGE_ROUTE,
    Component: StartPage,
  },
  {
    path: ADD_NEW_WORD_ROUTE,
    Component: NewWordAddForm,
  },
  {
    path: AUTHORIZATION_ROUTE,
    Component: Authorization,
  },
  {
    path: READ_WR_PHR_ROUTE,
    Component: WrPhrPage,
  },
  {
    path: CARDS_ROUTE,
    Component: Cards,
  },
  {
    path: ANSWER_ROUTE,
    Component: Answer,
  },
  {
    path: USER_ROUTE,
    Component: User,
  },
  // {
  //   path: "*",
  //   Component: () => <Navigate to={START_PAGE_ROUTE} />,
  // },
];

export const publicRoutes = [
  {
    path: START_PAGE_ROUTE,
    Component: StartPage,
  },
  {
    path: AUTHORIZATION_ROUTE,
    Component: Authorization,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Authorization,
  },
  {
    path: "*",
    Component: () => <Navigate to={START_PAGE_ROUTE} />,
  },
];
