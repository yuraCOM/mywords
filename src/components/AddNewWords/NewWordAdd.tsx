import { useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { addWordInFireBase, testConnect } from "../../FireBase/FireBaseService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Word } from "../../store/types";
import { isConnect } from "../../store/userAuthorizationSlice";
import { addWord } from "../../store/wordsSlice";
import { randomN } from "../../tools/random";
import { ucFirst } from "../../tools/serveses";
import WarningDisconect from "../../UI/WarningDisconect";
import DescriptionInput from "../DescriptionInput";
import SelectTypeWord from "./SelectTypeWord";

const NewWordAddForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userAuthorization);
  const userLogin = useAppSelector((state) => state.userAuthorization.login);
  const wordsArr = useAppSelector((state) => state.words.words);

  const [word, setWord] = useState({} as Word);

  const [filteredWordHelp, setFilteredWordHelp] = useState(Array<Word>);

  const [spinner, setSpinner] = useState(false);

  const wordHandler = (e: any) => {
    setWord({ ...word, word: e.target.value });

    let filteredArr: Word[] = [];
    let findWord = e.target.value;
    // setWord(findWord);
    //--------------------------
    // if (findWord.length >= 2) {
    //   filteredArr = wordsArr.filter((item) => {
    //     return item.word.toLowerCase().includes(word.toLowerCase());
    //   });
    // }
    //--------------------------
    if (findWord.length >= 2) {
      var reg = new RegExp(`^${findWord.toLowerCase()}`);
      wordsArr.forEach((item) => {
        if (reg.test(item.word.toLowerCase())) {
          filteredArr.push(item);
        }
      });
    }
    setFilteredWordHelp(filteredArr);
  };

  const handleAction = async () => {
    let newWord: Word = {
      wordId: "Word-" + Date.now().toString(),
      word: ucFirst(word.word) || "",
      type: word.type || "",
      meanOne: ucFirst(word.meanOne) || "",
      meanTwo: ucFirst(word.meanTwo || ""),
      meanThree: ucFirst(word.meanThree || ""),
      rating: 0,
      note: word.note || "",
    };

    if (!newWord.word.trim().length) {
      alert("Enter word");
    } else if (!newWord.type.length) {
      alert("Choose type");
    } else if (!newWord.meanOne.length) {
      alert("Enter min one description");
    } else {
      if (await testConnect(userLogin)) {
        dispatch(isConnect(false));
      } else {
        setSpinner(true);

        dispatch(addWord(newWord)); // в стор
        await addWordInFireBase(userLogin, newWord); // добавили в облако
        setWord({} as Word);
        setSpinner(false);
      }
    }
  };

  return (
    <div className="enter-word">
      {spinner && <Spinner animation="border" variant="success" />}

      {!user.isConnect && <WarningDisconect />}
      <label>
        <input
          className="form-control"
          placeholder="new word"
          value={word.word || ""}
          onChange={(e) => wordHandler(e)}
        />
      </label>
      <SelectTypeWord newWord={word} setNewWord={setWord} />
      <DescriptionInput
        value={word.meanOne || ""}
        description="meanOne"
        word={word}
        setWord={setWord}
      />
      <DescriptionInput
        value={word.meanTwo || ""}
        word={word}
        description="meanTwo"
        setWord={setWord}
      />
      <DescriptionInput
        value={word.meanThree || ""}
        description="meanThree"
        word={word}
        setWord={setWord}
      />

      <label>
        <textarea
          className="form-control"
          name="textarea"
          rows={5}
          cols={32}
          placeholder="write comments"
          value={word.note || ""}
          onChange={(e) => setWord({ ...word, note: e.target.value })}
        ></textarea>
      </label>

      <div className="m-auto">
        <button
          className="btn btn-outline-secondary mt-1"
          onClick={handleAction}
        >
          Add Word/Phrase
        </button>
      </div>
      <div>
        {filteredWordHelp.map((word, index) => (
          <div key={randomN() + "word"} className=" d-flex">
            <p className="m-0">
              {word.word} - {word.meanOne}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewWordAddForm;
