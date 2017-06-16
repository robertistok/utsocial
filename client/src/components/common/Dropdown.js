import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

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
    <div>
      <Label htmlFor={input.name}>{label}</Label>
      <StyledDropdown
        selection
        {...input}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

const {
  shape,
  string,
  func,
  arrayOf,
  oneOfType,
  number
} = PropTypes;
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

export const StyledDropdown = styled(Dropdown)`
	flex: 1;
	font-size: 14px !important;
	border-radius: 0px !important;
	max-height: 40px !important;
	max-width: 210px !important;
	text-align: center;
	margin: 10px;

	&.active {
		border-color: ${props => props.theme.primary} !important;
	}

	&:focus {
		border-color: ${props => props.theme.primary} !important;
	}

	div {
		border-color: ${props => props.theme.primary} !important;
	}

	div .text {
		font-size: 13px !important;
	}

	@media screen and (max-width: 378px) {
		font-size: 12px !important;

		div .text {
			font-size: 12px !important;
		}
	}
`;

const Label = styled.label`
	margin-left: 10px;

	@media screen and (max-width: 768px) {
		display: block;
	}
`;

export default DropDownField;
