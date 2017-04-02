import React from 'react';

const InputField = (
  { input, label, placeholder, type, meta: { touched, error } }
) => (
  <div className="field">
    <label htmlFor={input.name}>{label}</label>
    <input {...input} type={type} placeholder={placeholder} />
  </div>
);

export default InputField;
