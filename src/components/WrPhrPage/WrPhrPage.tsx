// Страница всего словаря
import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import "./wrPhrPageStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Word } from "../../store/types";
import { randomN } from "../../tools/random";
import { meanWords, ucFirst } from "../../tools/serveses";
import { deleteWords } from "../../store/wordsSlice";
import Stars from "../../UI/Stars";
import MySelect from "../../UI/MySelect";
import WarningDisconect from "../../UI/WarningDisconect";
import MyModal from "../../UI/MyModal";
import { dateWord, getFindWord, getSortedArr } from "./ToolsWrPhrPage";
import WordFixModal from "./wordFixModal";
import { Spinner } from "react-bootstrap";
import { sortType } from "../../tools/constant";

interface WrPhrPageProps {
  children?: ReactNode;
}

const WrPhrPage: FC<WrPhrPageProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuthorization);
  const wordsArr = useAppSelector((state) => state.words.words);

  const [selectedSort, setSelectedSort] = useState("");

  const [findWord, setFindWord] = useState("");

  //findWordsArr - построение идет по этом массиву и сортировка и поиск
  const [findWordsArr, setFindWorsdArr] = useState([] as Word[]);

  const [isLoading, setIsLoading] = useState(false);

  const delWord = async (word: Word) => {
    let isDelete = window.confirm("Are you sure? Delete word?");
    if (isDelete) {
      dispatch(deleteWords(word));
      setFindWorsdArr(wordsArr);
    }
  };

  //modal
  const [fixedWord, setFixedWord] = useState({} as Word);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFixedWord({} as Word);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFindWorsdArr(wordsArr);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFindWorsdArr(wordsArr);
      setIsLoading(false);
    }, 500);
  }, [wordsArr]);

  const sortWords = async (sort: string) => {
    setSelectedSort(sort);
    //wordsArr - первоначальный чистый массив слов!!!!
    let sortedWords = getSortedArr(sort, wordsArr);
    setFindWorsdArr(sortedWords);
  };

  function wordFindHandler(e: ChangeEvent<HTMLInputElement>): void {
    setFindWord(e.target.value);
    let filteredArr = getFindWord(e, wordsArr);
    setFindWorsdArr(filteredArr);
    setSelectedSort("");
  }

  function wordFix(word: Word): void {
    setFixedWord(word);
    setShow(true);
  }

  return (
    <div>
      {!user.isConnect && <WarningDisconect />}
      <div className="d-flex align-items-center search">
        <MySelect
          onChange={sortWords}
          value={selectedSort}
          defaultValue="Sort by..."
          options={sortType}
        />
        <label>
          <input
            className="form-control"
            placeholder="Find..."
            value={findWord}
            onChange={(e) => wordFindHandler(e)}
          />
        </label>
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      {!findWordsArr.length && !isLoading && <h4>Not found...</h4>}

      {wordsArr &&
        findWordsArr.map((word): any => (
          <div
            key={randomN()}
            className="table-words d-flex align-items-center"
          >
            <div
              className="d-flex flex-wrap flex-column justify-content-start word-in-dic"
              style={{ flexBasis: "30%" }}
              onClick={() => wordFix(word)}
            >
              <p className="word-in-dic">{ucFirst(word.word)}</p>
              <p className="time">{dateWord(word.wordId)}</p>
            </div>
            <div
              className="word-meaning d-flex flex-row"
              style={{ flexBasis: "60%" }}
            >
              <div>
                <Stars word={word} />
                {meanWords(word)}
              </div>
              {word.note && <MyModal info={word} />}
            </div>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => delWord(word)}
              >
                Del
              </button>
            </div>
          </div>
        ))}
      {fixedWord.word && (
        <WordFixModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          word={fixedWord}
        />
      )}
    </div>
  );
};

export default WrPhrPage;
