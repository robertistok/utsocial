import React from 'react';
import { Form } from 'semantic-ui-react';

const RadioButton = ({ input, label, disabled }) => (
  <Form.Radio
    {...input}
    label={label}
    disabled={disabled}
    onChange={(param, data) => input.onChange(data.value)}
  />
);

export default RadioButton;
