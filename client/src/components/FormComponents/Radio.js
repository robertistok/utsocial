import React from 'react'; import PropTypes from 'prop-types'
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

const { shape, string, bool, func } = PropTypes;
RadioButton.propTypes = {
  input: shape({
    name: string.isRequired,
    value: bool,
    onChange: func.isRequired
  }).isRequired,
  customOnChange: func,
  disabled: bool,
  label: string
};

export default RadioButton;
