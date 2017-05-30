import React from 'react';
import { Form } from 'semantic-ui-react';

const InputWithLabel = (
  { input, label, placeholder, type, meta: { touched, error }, width }
) => (
  <Form.Field error={touched && error} width={width}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input {...input} type={type} placeholder={placeholder} />
  </Form.Field>
);

const { shape, string, bool, number } = React.PropTypes;
InputWithLabel.propTypes = {
  input: shape({ name: string.isRequired, value: string }).isRequired,
  label: string,
  placeholder: string,
  meta: shape({ touched: bool, error: bool }).isRequired,
  type: string.isRequired,
  width: number
};

export default InputWithLabel;
