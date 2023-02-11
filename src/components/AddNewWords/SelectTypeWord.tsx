import React, { FC } from "react";
import { Word } from "../../store/types";

interface SelectTypeWordProps {
  newWord: Word;
  setNewWord(e: any): void;
}
const SelectTypeWord: FC<SelectTypeWordProps> = ({ newWord, setNewWord }) => {
  return (
    <label className="d-flex">
      {/* Type */}
      <select
        className="form-select"
        name="selectWrPhr"
        value={newWord.type}
        onChange={(e) => setNewWord({ ...newWord, type: e.target.value })}
      >
        <option value="">--Choose type--</option>
        <option value="word">word</option>
        <option value="phrase">phrase</option>
      </select>
    </label>
  );
};

export default SelectTypeWord;
