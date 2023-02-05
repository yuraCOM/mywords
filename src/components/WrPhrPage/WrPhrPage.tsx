// Страница всего словаря

import { FC, ReactNode, useState } from "react";
import "./wrPhrPageStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Word } from "../../store/types";
import { randomN } from "../../tools/random";
import { meanWords, ucFirst } from "../../tools/serveses";
import { deleteWords, getUserWords } from "../../store/wordsSlice";
import Stars from "../../UI/Stars";
import moment from "moment";
import MySelect from "../../UI/MySelect";
import WarningDisconect from "../../UI/WarningDisconect";

interface WrPhrPageProps {
  children?: ReactNode;
}
const WrPhrPage: FC<WrPhrPageProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userAuthorization);

  const wordsArr = useAppSelector((state) => state.words.words);

  const [selectedSort, setSelectedSort] = useState("");

  const delWord = async (word: Word) => {
    let isBoss = window.confirm("Are you sure? Delete word?");
    if (isBoss) {
      dispatch(deleteWords(word));
    }
  };

  const infoWord = (word: string | undefined) => {
    console.log(word);
  };

  const dateWord = (data: string) => {
    var date = Number(data.slice(5));
    return moment(date).format("'MMM Do YY, h:mm:ss a'");
  };

  const sortWords = (sort: string) => {
    setSelectedSort(sort);
    if (sort === "wordUP") {
      let sortedWords: Word[] = [...wordsArr].sort((a: Word, b: Word) =>
        a.word.localeCompare(b.word)
      );
      dispatch(getUserWords({ words: sortedWords }));
    }
    if (sort === "wordDown") {
      let sortedWords: Word[] = [...wordsArr].sort((a: Word, b: Word) =>
        b.word.localeCompare(a.word)
      );
      dispatch(getUserWords({ words: sortedWords }));
    }
    if (sort === "rating") {
      let sortedWords: Word[] = [...wordsArr].sort(
        (a: Word, b: Word) => b.rating - a.rating
      );
      dispatch(getUserWords({ words: sortedWords }));
    }
    if (sort === "dateUp") {
      let sortedWords: Word[] = [...wordsArr].sort(
        (a: Word, b: Word) =>
          Number(b.wordId.slice(5)) - Number(a.wordId.slice(5))
      );
      dispatch(getUserWords({ words: sortedWords }));
    }
    if (sort === "dateDown") {
      console.log("sort: ", sort);

      let sortedWords: Word[] = [...wordsArr].sort(
        (a: Word, b: Word) =>
          Number(a.wordId.slice(5)) - Number(b.wordId.slice(5))
      );
      dispatch(getUserWords({ words: sortedWords }));
    }
  };

  return (
    <>
      {!user.isConnect && <WarningDisconect />}
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
      {/* {wordsArr.length === 0 && <h2>No connection to server!!! Try later</h2>} */}
      {wordsArr &&
        wordsArr.map((word): any => (
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
              <p>
                {meanWords(word)}
                {word.note && (
                  <button
                    type="button"
                    className="btn btn-info btn-sm btn-info"
                    onClick={() => infoWord(word.note)}
                  >
                    i
                  </button>
                )}
              </p>
              <Stars word={word} random={() => randomN()} />
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
