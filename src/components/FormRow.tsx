import React from "react";

type Props = {
  type: React.HTMLInputTypeAttribute;
  value: string;
  name: string;
  handleChange: React.ChangeEventHandler;
  labelText?: string;
};

const FormRow: React.FC<Props> = (props) => {
  const { type, value, name, handleChange, labelText } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText ?? name}
      </label>
      <input
        // type={isPassword ? "password" : type}
        type={type}
        value={value}
        name={name}
        className="form-input"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
