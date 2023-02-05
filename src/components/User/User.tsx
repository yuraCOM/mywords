import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import InfoCard from "../StartPage/InfoCard";

const User: FC = () => {
  const user = useAppSelector((state) => state.userAuthorization);
  const userWords = useAppSelector((state) => state.words.words);

  const User = {
    bgColor: "bg-info",
    head: "User",
    text: `Login - ${user.login}`,
  };

  const Dic = {
    bgColor: "bg-warning",
    head: "About your dictionary",
    text: `In your dictionary - ${userWords.length} words, <br> `,
  };

  return (
    <div className="d-flex">
      <InfoCard info={User} />
      <InfoCard info={Dic} />
    </div>
  );
};

export default User;
