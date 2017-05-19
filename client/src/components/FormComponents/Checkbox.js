import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

const CustomCheckbox = ({ input, label, customOnChange }) => {
  const handleChange = (param, data) => {
    if (customOnChange) {
      customOnChange();
    }
    input.onChange(data.value);
  };

  return (
    <div className="field">
      <div className="ui checkbox">
        <input
          {...input}
          type="checkbox"
          value={input.value}
          checked={input.value}
        />
        <label htmlFor={input.name}>{label}</label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
