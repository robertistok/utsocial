import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const GradeInput = (props) => {
  const { grade, error, onChange, onBlur } = props;

  return (
    <StyledInput
      value={grade}
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus
      type="number"
      min="1"
      max="10"
      transparent
    />
  );
};

const { number, func, oneOfType, string, bool } = PropTypes;
GradeInput.propTypes = {
  onChange: func.isRequired,
  onBlur: func.isRequired,
  error: bool.isRequired,
  grade: oneOfType([string, number]).isRequired
};

const StyledInput = styled(Input)`
	width: 100%;
	height: 100%;

	.error {
		background-color: ${props => props.theme.error} !important;
	}
	input {
		border-radius: 0px !important;
		text-align: center !important;
		font-family: Roboto !important;
	}
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
  	-webkit-appearance: none;
  	margin: 0;
	}
`;

export default GradeInput;
