import React from 'react'; import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react';

const InputField = (
  { input, label, placeholder, type, meta: { touched, error } }
) => (
  <Form.Field error={touched && error} required>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input {...input} type={type} placeholder={placeholder} />
  </Form.Field>
);

export default InputField;
