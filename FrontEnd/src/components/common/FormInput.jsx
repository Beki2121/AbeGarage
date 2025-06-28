import React from "react";
import ValidationError from "./ValidationError";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  ...rest
}) => (
  <div className="form-group col-md-12">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
    <ValidationError error={error} />
  </div>
);

export default FormInput;
