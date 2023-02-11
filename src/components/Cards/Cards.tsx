import { FC, ReactNode, useEffect } from "react";
import "./cardsStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { randomN } from "../../tools/random";
import { getCardWords } from "./cardsTools";
import VariantWordCard from "./VariantWordCard";
import { addCards } from "../../store/cardsSlice";
import Answer from "./Answer";
import { ucFirst } from "../../tools/serveses";
import Stars from "../../UI/Stars";
import WarningDisconect from "../../UI/WarningDisconect";
import { answerSound, nextSound } from "../../tools/constant";

interface CardsProps {
  children?: ReactNode;
}

const Cards: FC<CardsProps> = () => {
  const dispatch = useAppDispatch();

  // все слова юзера
  const wordsArr = useAppSelector((state) => state.words.words);

  const user = useAppSelector((state) => state.userAuthorization);

  // загадка массив
  const wordsQuiz = useAppSelector((state) => state.cards.cards);

  useEffect(() => {
    const getCardHandler = async () => {
      dispatch(addCards(await getCardWords(wordsArr)));
    };
    getCardHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCardHandler = async () => {
    user.isSound && nextSound.play();
    dispatch(addCards(await getCardWords(wordsArr)));
  };

  return (
    <div className="cards">
      {!user.isConnect && <WarningDisconect />}

      {user.isConnect && !wordsQuiz.hiddenWord && (
        <h4>
          You have few words in the dictionary or you have already learned all
          the words! Add new words or reset the word rating!
        </h4>
      )}
      {wordsQuiz.answer && <Answer />}
      {wordsQuiz.hiddenWord && (
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center mt-1">
            <h6>Choose the meaning of the word:</h6>
            <h2>{ucFirst(wordsQuiz.hiddenWord.word)}</h2>
            <div className="stars">
              <Stars word={wordsQuiz.hiddenWord} />
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {wordsQuiz.mockArr.map((item) => (
              <VariantWordCard
                key={randomN()}
                word={item}
                soundToggle={user.isSound}
                audio={answerSound}
                // bgColor={getRndBgColor(bgColorArr)}
                bgColor={"bg-secondary"}
              />
            ))}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success btn-lg"
          onClick={() => getCardHandler()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;
