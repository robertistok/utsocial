import React from 'react';
import { Form } from 'semantic-ui-react';

const RadioButton = ({ input, label, disabled, customOnChange }) => {
  const handleChange = (param, data) => {
    if (customOnChange) {
      customOnChange();
    }
    input.onChange(data.value);
  };

  return (
    <Form.Radio
      {...input}
      label={label}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default RadioButton;
