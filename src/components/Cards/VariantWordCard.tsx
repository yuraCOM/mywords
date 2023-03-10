import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { updateCardsAnswer } from "../../store/cardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Word } from "../../store/types";
import { updateWords } from "../../store/wordsSlice";
import { ANSWER_ROUTE } from "../../tools/constant";
import { meanWords } from "../../tools/serveses";
// import tap from "../../assets/sounds/sentmessage.mp3";

interface VariantWordCardProps {
  word: Word;
  bgColor: string;
  audio: any;
  soundToggle?: boolean;
}

const VariantWordCard: FC<VariantWordCardProps> = ({
  word,
  bgColor,
  audio,
  soundToggle,
}) => {
  const dispatch = useAppDispatch();

  const cardsArr = useAppSelector((state) => state.cards.cards);
  const userState = useAppSelector((state) => state.userAuthorization);

  const history = useNavigate();

  async function checkWord(word: Word) {
    userState.isSound && audio.play();

    if (cardsArr.hiddenWord.meanOne === word.meanOne) {
      let newRating = cardsArr.hiddenWord.rating + 1;
      let updW = { ...cardsArr.hiddenWord, rating: newRating };
      dispatch(updateWords(updW)); //update ONE words in state
      dispatch(updateCardsAnswer(true));
      history(ANSWER_ROUTE);
    } else {
      dispatch(updateCardsAnswer(false));
      history(ANSWER_ROUTE);
    }
  }

  return (
    <div
      className={`card  text-white bg-primary mb-3 m-2 bg-gradient ${bgColor} mock-card  text-center`}
      onClick={() => checkWord(word)}
    >
      <div className="card-body">
        <p className="card-text">{meanWords(word)}</p>
      </div>
    </div>
  );
};

export default VariantWordCard;
