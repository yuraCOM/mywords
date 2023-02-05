import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { randomN } from "../tools/random";

interface AppRouterProps {
  isAuth: boolean;
}

const AppRouter: FC<AppRouterProps> = ({ isAuth }) => {
  return (
    <Routes>
      {isAuth
        ? authRoutes.map(({ path, Component }) => (
            <Route key={randomN()} path={path} element={<Component />} />
          ))
        : publicRoutes.map(({ path, Component }) => (
            <Route key={randomN()} path={path} element={<Component />} />
          ))}
      <Route path="/" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default AppRouter;
