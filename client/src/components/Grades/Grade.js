import React from 'react'; import PropTypes from 'prop-types'
import styled from 'styled-components';

const Grade = (props) => {
  const { onClick, grade } = props;

  return (
    <Wrapper onClick={onClick}>
      {grade === '' ? '-' : grade}
    </Wrapper>
  );
};

const { number, func, oneOfType, string } = PropTypes;
Grade.propTypes = {
  onClick: func,
  grade: oneOfType([string, number]).isRequired
};

const Wrapper = styled.span`
	display: inline-block;
	width: 100%;
	text-align: center;
	padding: 10px;
	&:hover {
		cursor: pointer;
	}
`;

export default Grade;
