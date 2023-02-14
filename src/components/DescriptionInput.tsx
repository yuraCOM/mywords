import { Word } from "../store/types";

interface DescriptionInputProps {
  word: Word;
  value?: string;
  description?: any;
  setWord: (e: any) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  word,
  value,
  setWord,
  description,
}) => {
  return (
    <label>
      <input
        className="form-control"
        placeholder="description"
        value={value}
        onChange={(e: any) =>
          setWord({ ...word, [description]: e.target.value })
        }
      />
    </label>
  );
};

export default DescriptionInput;
