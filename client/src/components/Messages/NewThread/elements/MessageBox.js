import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextAreaField = ({ input, placeholder, rows = 11 }) => (
  <TextArea {...input} placeholder={placeholder} rows={rows} />
);

const { shape, string, number } = PropTypes;
TextAreaField.propTypes = {
  input: shape({ value: string.isRequired }).isRequired,
  placeholder: string.isRequired,
  rows: number
};

const TextArea = styled.textarea`
	border: none;
	overflow: auto;
	outline: none;
	box-shadow: none;
	padding: 10px;
	margin: 20px;
	resize: none;
	width: 100%;
	height: 100%;
	color: ${props => props.theme.black}

	border: 1px solid rgba(34,36,38,.15);

	&:hover {
		border-color: rgba(34,36,38,.35);
	}

	&:focus {
		border-color: ${props => props.theme.primary};
	}
`;

export default TextAreaField;
