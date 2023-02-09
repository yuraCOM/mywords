// Страница всего словаря

import { ChangeEvent, FC, ReactNode, useState } from "react";
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
import { dateWord, getFindWord } from "./ToolsWrPhrPage";

interface WrPhrPageProps {
  children?: ReactNode;
}
const WrPhrPage: FC<WrPhrPageProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuthorization);

  const wordsArr = useAppSelector((state) => state.words.words);

  const [selectedSort, setSelectedSort] = useState("");

  const [findWord, setFineWord] = useState("");
  const [findWordsArr, setFindWorsdArr] = useState(wordsArr);

  const delWord = async (word: Word) => {
    let isDelete = window.confirm("Are you sure? Delete word?");
    if (isDelete) {
      dispatch(deleteWords(word));
    }
  };

  const sortWords = (sort: string) => {
    setSelectedSort(sort);
    let sortedWords: Word[] = [];
    if (sort === "wordUp") {
      sortedWords = [...wordsArr].sort((a: Word, b: Word) =>
        a.word.localeCompare(b.word)
      );
    }
    if (sort === "wordDown") {
      sortedWords = [...wordsArr].sort((a: Word, b: Word) =>
        b.word.localeCompare(a.word)
      );
    }
    if (sort === "rating") {
      sortedWords = [...wordsArr].sort(
        (a: Word, b: Word) => b.rating - a.rating
      );
    }
    if (sort === "dateUp") {
      sortedWords = [...wordsArr].sort(
        (a: Word, b: Word) =>
          Number(b.wordId.slice(5)) - Number(a.wordId.slice(5))
      );
    }
    if (sort === "dateDown") {
      sortedWords = [...wordsArr].sort(
        (a: Word, b: Word) =>
          Number(a.wordId.slice(5)) - Number(b.wordId.slice(5))
      );
    }
    setFindWorsdArr(sortedWords);
  };

  function wordFindHandler(e: ChangeEvent<HTMLInputElement>): void {
    setFineWord(e.target.value);
    let filteredArr = getFindWord(e, wordsArr);
    setFindWorsdArr(filteredArr);
    setSelectedSort("");
  }

  return (
    <>
      {!user.isConnect && <WarningDisconect />}
      <div className="d-flex align-items-center">
        <MySelect
          onChange={sortWords}
          value={selectedSort}
          defaultValue="Sort by..."
          options={[
            { value: "wordUp", name: "Sort Abc > Z" },
            { value: "wordDown", name: "Sort Zyw > A" },
            { value: "dateDown", name: "Sort date up" },
            { value: "dateUp", name: "Sort date down" },
            { value: "rating", name: "Sort by stars" },
          ]}
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

      {wordsArr &&
        findWordsArr.map((word): any => (
          <div
            key={randomN()}
            className="table-words d-flex align-items-center"
          >
            <div
              className="d-flex flex-wrap flex-column justify-content-start "
              style={{ flexBasis: "30%" }}
            >
              <p>{ucFirst(word.word)}</p>
              <p className="time">{dateWord(word.wordId)}</p>
            </div>
            <div
              className="word-meaning d-flex flex-row"
              style={{ flexBasis: "60%" }}
            >
              <div>
                <Stars word={word} random={() => randomN()} />
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
    </>
  );
};

export default WrPhrPage;
