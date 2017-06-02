import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

const InputField = ({ input, placeholder, type }) => (
  <StyledInput required>
    <input {...input} type={type} placeholder={placeholder} />
  </StyledInput>
);

const { shape, string } = PropTypes;
InputField.propTypes = {
  input: shape({ value: string.isRequired }).isRequired,
  placeholder: string.isRequired,
  type: string.isRequired
};

const StyledInput = styled(Input)`
	width: 100%;
	margin: 20px;
	height: 40px !important;

	input {
		font-family: Roboto !important;
		border-radius: 0 !important;
		height: 40px !important;

		&:focus {
			border-color: ${props => props.theme.primary} !important;
		}

		&:hover {
			border-color: rgba(34,36,38,.35) !important;
		}
	}
`;

export default InputField;
