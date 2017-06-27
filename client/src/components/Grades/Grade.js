import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Grade = (props) => {
  const { onClick, grade, isStudent } = props;
  return (
    <Wrapper
      onClick={onClick}
      aboveFive={typeof grade === 'number' ? grade >= 5 : null}
      isStudent={isStudent}
    >
      {grade === '' ? '-' : grade}
    </Wrapper>
  );
};

const { number, func, oneOfType, string, bool } = PropTypes;
Grade.propTypes = {
  onClick: func,
  grade: oneOfType([string, number]).isRequired,
  isStudent: bool
};

Grade.defaultProps = {
  isStudent: false
};

const Wrapper = styled.span`
	display: inline-block;
	width: 100%;
	text-align: center;
	padding: 10px;
	color: ${(props) => {
  if (props.aboveFive !== null) {
    if (props.aboveFive === true) {
      return props.theme.primary;
    } else if (props.aboveFive === false) {
      return props.theme.error;
    }
  }
  return props.theme.black;
}};

	&:hover {
		cursor: ${props => !props.isStudent && 'pointer'};
	}


`;

export default Grade;
