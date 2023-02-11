import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FC, useEffect, useState } from "react";
import { Word } from "../../store/types";
import SelectTypeWord from "../AddNewWords/SelectTypeWord";
import DescriptionInput from "../DescriptionInput";
import { updateWords } from "../../store/wordsSlice";
import { useAppDispatch } from "../../store/hooks";
import Stars from "../../UI/Stars";

interface WordFixModaProps {
  show: boolean;
  handleClose(): void;
  handleShow?(): void;
  word: Word;
}

const WordFixModal: FC<WordFixModaProps> = ({
  show,
  handleClose,
  word,
}): any => {
  const dispatch = useAppDispatch();

  const [newWord, setNewWord] = useState({} as Word);

  useEffect(() => {
    setNewWord(word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSaveNewWord(): void {
    dispatch(updateWords(newWord));
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} className="modal-fix-word">
      <Modal.Header closeButton>
        <Modal.Title>Fix the word</Modal.Title>
      </Modal.Header>
      {newWord && (
        <Modal.Body className="modal-body">
          <p>Word:</p>
          <input
            autoFocus
            className="form-control"
            value={newWord.word || ""}
            onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
          />
          <div className="d-flex">
            Stars:
            <Stars word={newWord} />
          </div>
          <input
            className="form-control"
            value={newWord.rating || ""}
            onChange={(e) =>
              setNewWord({ ...newWord, rating: Number(e.target.value) })
            }
          />

          <p>Type:</p>
          <SelectTypeWord newWord={newWord} setNewWord={setNewWord} />

          <p>Description:</p>
          <DescriptionInput
            value={newWord.meanOne || ""}
            description={"meanOne"}
            word={newWord}
            setWord={setNewWord}
          />

          <p>Description:</p>
          <DescriptionInput
            value={newWord.meanTwo || ""}
            description="meanTwo"
            word={newWord}
            setWord={setNewWord}
          />

          <p>Description:</p>
          <DescriptionInput
            word={newWord}
            description={"meanThree" || ""}
            value={newWord.meanThree || ""}
            setWord={setNewWord}
          />

          <p>Comments:</p>
          <textarea
            className="form-control"
            name="textarea"
            rows={5}
            cols={32}
            placeholder="write comments"
            value={newWord.note || ""}
            onChange={(e) => setNewWord({ ...newWord, note: e.target.value })}
          ></textarea>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSaveNewWord()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WordFixModal;
