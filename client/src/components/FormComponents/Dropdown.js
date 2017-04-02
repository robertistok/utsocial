import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

const DropDownField = (
  {
    input,
    label,
    meta: { touched, error },
    placeholder,
    options,
    customOnChange
  }
) => (
  <Form.Field>
    <label htmlFor={input.name}>{label}</label>
    <Dropdown
      selection
      {...input}
      value={input.value}
      options={options}
      placeholder={placeholder}
      onChange={(param, data) => {
        if (customOnChange) customOnChange();
        input.onChange(data.value);
      }}
    />
  </Form.Field>
);

export default DropDownField;
