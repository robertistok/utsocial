import React from 'react';
import { Form } from 'semantic-ui-react';

const InputField = (
  { input, label, placeholder, type, meta: { touched, error }, width }
) => (
  <Form.Field error={touched && error} width={width}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input {...input} type={type} placeholder={placeholder} />
  </Form.Field>
);

export default InputField;
