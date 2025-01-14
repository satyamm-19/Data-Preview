import React from "react";

const InputField = ({ label, type, register, error, validation }) => (
  <div>
    <label>{label}</label>
    <input
      className={error ? "input-error" : ""}
      type={type}
      {...register(validation.name, validation.options)}
    />
    {error && <p className="error-msg">{error.message}</p>}
  </div>
);

export default InputField;
