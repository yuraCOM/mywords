import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { addCards } from "../../store/cardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CARDS_ROUTE,
  nextSound,
  stopAudio,
  verno,
  wrong,
} from "../../tools/constant";
import { meanWords, ucFirst } from "../../tools/serveses";
import Stars from "../../UI/Stars";
import { getCardWords } from "./cardsTools";

const Answer: FC = () => {
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector((state) => state.cards.cards);
  const userState = useAppSelector((state) => state.userAuthorization);
  const wordsArr = useAppSelector((state) => state.words.words);

  let wordNow = { ...cardsState.hiddenWord };
  wordsArr.forEach((i) => {
    if (i.wordId === wordNow.wordId) {
      wordNow = i;
    }
  });

  if (userState.isSound) {
    cardsState.answer ? verno.play() : wrong.play();
  }

  const history = useNavigate();

  async function nextCardHandler() {
    dispatch(addCards(await getCardWords(wordsArr)));
    stopAudio(verno);
    stopAudio(wrong);
    userState.isSound && nextSound.play();
    history(CARDS_ROUTE);
  }

  // function stopAudio(audio: any) {
  //   audio.pause();
  //   audio.currentTime = 0;
  // }

  return (
    <div className="answer d-flex justify-content-center flex-column">
      <div
        className={
          cardsState.answer
            ? `card text-white bg-primary mb-3 m-3 bg-success`
            : `card text-white bg-primary mb-3 m-3 bg-danger`
        }
      >
        <div className="card-header text-center">
          {cardsState.answer ? (
            <h4>
              Congratulations ! <br /> Answer Correct !
            </h4>
          ) : (
            <h4>
              The answer is not correct ! <br />
              Don't be upset !
            </h4>
          )}
        </div>
        <div className="card-body">
          <div className="card-text d-flex justify-content-center text-center fs-5 fst-italic">
            <span className="mx-2 ans-span">word:</span>{" "}
            <h2> {ucFirst(wordNow.word)}</h2>
          </div>
          <div className="stars d-flex justify-content-center">
            <Stars word={wordNow} />
          </div>

          <p className="text-center fs-4 fst-italic">
            <span className="mx-2 fs-5">meaning:</span>
            {meanWords(wordNow)}
          </p>

          {wordNow.note ? (
            <p className="text-center">
              <span className="mx-2">comments:</span> {wordNow.note}{" "}
            </p>
          ) : (
            false
          )}
        </div>
      </div>
      <button
        type="button"
        className={
          !cardsState.answer
            ? "btn btn-outline-danger btn-lg align-self-center"
            : "btn btn-outline-success btn-lg align-self-center"
        }
        onClick={() => nextCardHandler()}
      >
        Next
      </button>
    </div>
  );
};

export default Answer;
