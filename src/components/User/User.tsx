import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reset7Stars } from "../../store/wordsSlice";
import InfoCard from "../StartPage/InfoCard";

const User: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuthorization);
  const userWords = useAppSelector((state) => state.words.words);
  const sevenStarsWords = userWords.filter((w) => w.rating === 7);

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
    text2: `7 Stars Words - ${sevenStarsWords.length} words`,
  };

  function resetStars(): void {
    window.confirm("Reset ALL 7-Seven Stars Rating! ???") &&
      dispatch(reset7Stars());
  }

  return (
    <div className="d-flex flex-row flex-wrap">
      <InfoCard info={User} />
      <InfoCard info={Dic} />
      <div
        className={`card text-white bg-primary mb-3 m-3 bg-warning info-card`}
      >
        <div className="card-header">Warning!!!</div>
        <div className="card-body">
          <p className="card-text">Reset the 7 Stars</p>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => resetStars()}
          >
            Danger
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
