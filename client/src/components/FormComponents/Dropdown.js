import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

const DropDownField = (
  {
    input,
    label,
    placeholder,
    options,
    customOnChange
  }
) => {
  const handleChange = (param, data) => {
    if (customOnChange) customOnChange();
    input.onChange(data.value);
  };

  return (
    <Form.Field>
      <label htmlFor={input.name}>{label}</label>
      <Dropdown
        selection
        {...input}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Form.Field>
  );
};

const {
  shape,
  string,
  func,
  arrayOf,
  oneOfType,
  number
} = React.PropTypes;
DropDownField.propTypes = {
  input: shape({
    name: string.isRequired,
    value: oneOfType([string, number]).isRequired,
    onChange: func.isRequired
  }).isRequired,
  options: arrayOf(
    shape({
      key: oneOfType([string, number]).isRequired,
      value: oneOfType([string, number]).isRequired,
      text: oneOfType([string, number]).isRequired
    }).isRequired
  ).isRequired,
  customOnChange: func,
  placeholder: string,
  label: string
};

export default DropDownField;
