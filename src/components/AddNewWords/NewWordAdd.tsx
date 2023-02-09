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

const NewWordAddForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userAuthorization);
  const userLogin = useAppSelector((state) => state.userAuthorization.login);
  const wordsArr = useAppSelector((state) => state.words.words);

  const [word, setWord] = useState("");
  const [type, setType] = useState("");
  const [description01, setDescription01] = useState("");
  const [description02, setDescription02] = useState("");
  const [description03, setDescription03] = useState("");
  const [note, setNote] = useState("");

  const [filteredWordHelp, setFilteredWordHelp] = useState(Array<Word>);

  const [spinner, setSpinner] = useState(false);

  const wordHandler = (e: any) => {
    let filteredArr: Word[] = [];
    let findWord = e.target.value;
    setWord(findWord);
    //--------------------------
    // if (findWord.length >= 2) {
    //   filteredArr = wordsArr.filter((item) => {
    //     return item.word.toLowerCase().includes(word.toLowerCase());
    //   });
    //   console.log(filteredArr);
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
      word: ucFirst(word),
      type: type,
      meanOne: ucFirst(description01),
      meanTwo: ucFirst(description02),
      meanThree: ucFirst(description03),
      rating: 0,
      note: note,
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
        dispatch(await addWord(newWord)); // в стор
        await addWordInFireBase(userLogin, newWord); // добавили в облако

        setWord("");
        setType("");
        setDescription01("");
        setDescription02("");
        setDescription03("");
        setNote("");
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
          value={word}
          onChange={(e) => wordHandler(e)}
        />
      </label>
      <label>
        <select
          className="form-select"
          name="selectWrPhr"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">--Choose type--</option>
          <option value="word">word</option>
          <option value="phrase">phrase</option>
        </select>
      </label>
      <DescriptionInput value={description01} setValue={setDescription01} />
      <DescriptionInput value={description02} setValue={setDescription02} />
      <DescriptionInput value={description03} setValue={setDescription03} />
      <label>
        <textarea
          className="form-control"
          name="textarea"
          rows={5}
          cols={32}
          placeholder="write comments"
          value={note}
          onChange={(e) => setNote(e.target.value)}
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
              {word.word} - {word.meanOne}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewWordAddForm;
