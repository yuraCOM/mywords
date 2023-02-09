interface DescriptionInputProps {
  value: string;
  setValue: (value: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  setValue,
}) => {
  return (
    <label>
      <input
        className="form-control"
        placeholder="description"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default DescriptionInput;
