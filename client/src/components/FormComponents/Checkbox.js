import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

const CheckBox = ({ input, label, customOnChange }) => {
  const handleChange = (param, data) => {
    if (customOnChange) {
      customOnChange();
    }

    input.onChange(String(data.value));
  };

  return (
    <Form.Field>
      <Checkbox {...input} onChange={handleChange} label={label} />
    </Form.Field>
  );
};

export default CheckBox;
