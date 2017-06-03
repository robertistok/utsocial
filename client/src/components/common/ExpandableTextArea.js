import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ExpandableTextArea = (props) => {
  const {
    input,
    placeholder,
    rows = 1
  } = props;

  return <TextArea {...input} placeholder={placeholder} rows={rows} />;
};

const { shape, string, number } = PropTypes;
ExpandableTextArea.propTypes = {
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
	resize: none;
	width: 100%;
	height: 100%;
	color: ${props => props.theme.black}

	&:focus {
		border: 1px solid ${props => props.theme.primary};
	}
`;

export default ExpandableTextArea;
