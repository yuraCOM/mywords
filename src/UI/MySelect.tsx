import { FC } from "react";

type option = {
  value: string;
  name: string;
};
interface MySelectProps {
  options: option[];
  value: string;
  defaultValue: string;
  //   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => string
  onChange: any;
}

const MySelect: FC<MySelectProps> = ({
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <select
      className="form-select w-auto m-1"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
