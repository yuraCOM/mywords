import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import InfoCard from "../StartPage/InfoCard";

const User: FC = () => {
  const user = useAppSelector((state) => state.userAuthorization);
  const userWords = useAppSelector((state) => state.words.words);
  const sevenStarsWords = userWords.filter((w) => w.rating === 7).length;

  const User = {
    bgColor: "bg-primary ",
    head: "User:",
    text: `Login - ${user.login}`,
    text2: `Password - ${user.password}`,
  };

  const Dic = {
    bgColor: "bg-info",
    head: "About your dictionary:",
    text: `In your dictionary - ${userWords.length} words`,
    text2: `7 Stars Words - ${sevenStarsWords} words`,
  };

  return (
    <div className="d-flex">
      <InfoCard info={User} />
      <InfoCard info={Dic} />
    </div>
  );
};

export default User;
