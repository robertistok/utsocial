import React from 'react';
import styled from 'styled-components';

const Input = ({ input, placeholder, type, autoFocus }) => (
  <Wrapper>
    <StyledInput
      {...input}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  </Wrapper>
);

const { shape, string } = React.PropTypes;
Input.propTypes = {
  input: shape({ name: string.isRequired, value: string }).isRequired,
  placeholder: string,
  type: string.isRequired
};

const Wrapper = styled.div`
	width: 90%;
	margin: 20px auto;
`;

const StyledInput = styled.input`
	outline: none;
	border: 1px solid #e6ecf0;
	width: 100%;
	height: 40px
	padding: 15px;

	border-color: ${props => props.error && '#ff0033'};

	&:focus {
		border: 1px solid ${props => props.theme.primary};
	}
`;

export default Input;
