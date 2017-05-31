import React from 'react'; import PropTypes from 'prop-types'

const CustomCheckbox = ({ input, label }) => (
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

const { shape, string, any } = PropTypes;
CustomCheckbox.propTypes = {
  input: shape({ value: any, name: string }).isRequired,
  label: string.isRequired
};

export default CustomCheckbox;
