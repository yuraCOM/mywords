import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateFBWords } from "../../FireBase/FireBaseService";
import { addCards } from "../../store/cardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CARDS_ROUTE } from "../../tools/constant";
import { meanWords, ucFirst } from "../../tools/serveses";
import { getCardWords } from "./cardsTools";

const Answer: FC = () => {
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector((state) => state.cards.cards);
  const wordNow = cardsState.hiddenWord;
  const wordsArr = useAppSelector((state) => state.words.words);
  const user = useAppSelector((state) => state.userAuthorization);
  const history = useNavigate();

  useEffect(() => {
    updateFBWords(user.login, wordsArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function nextCardHandler() {
    dispatch(addCards(await getCardWords(wordsArr)));
    history(CARDS_ROUTE);
  }

  return (
    <div className="answer d-flex justify-content-center flex-column align-items-center">
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
            <span className="mx-2">word:</span>{" "}
            <h2> {ucFirst(wordNow.word)}</h2>
          </div>

          <p className="text-center fs-4 fst-italic">
            <span className="mx-2 fs-5">meaning:</span>
            {meanWords(wordNow)}
          </p>
          <p className="text-center">
            <span className="mx-2">comments:</span>
            {wordNow.note}
          </p>
        </div>
      </div>
      <button
        type="button"
        className={
          !cardsState.answer
            ? "btn btn-outline-danger btn-lg"
            : "btn btn-outline-success btn-lg"
        }
        onClick={() => nextCardHandler()}
      >
        Next
      </button>
    </div>
  );
};

export default Answer;
