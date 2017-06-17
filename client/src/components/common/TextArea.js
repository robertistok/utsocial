import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const TextArea = (
  { input, label, placeholder, meta: { touched, error }, width, rows }
) => (
  <Form.Field error={touched && error} width={width}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <textarea {...input} placeholder={placeholder} rows={rows} />
  </Form.Field>
);

const { shape, string, bool, number } = PropTypes;
TextArea.propTypes = {
  input: shape({ name: string.isRequired, value: string }).isRequired,
  label: string,
  placeholder: string,
  meta: shape({ touched: bool, error: bool }).isRequired,
  width: number,
  rows: number
};

export default TextArea;
