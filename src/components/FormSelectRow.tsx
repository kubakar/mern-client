import React from "react";

type Props = {
  // type: React.HTMLInputTypeAttribute;
  options: string[];
  value: string;
  name: string;
  handleChange?: React.ChangeEventHandler;
  labelText?: string;
};

const FormSelectRow: React.FC<Props> = (props) => {
  const { options, value, name, handleChange, labelText } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText ?? name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {options.map((item, idx) => {
          return (
            <option value={item} key={idx}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

FormSelectRow.defaultProps = {
  handleChange: () => {},
};

export default FormSelectRow;
