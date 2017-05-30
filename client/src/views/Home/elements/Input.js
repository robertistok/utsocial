import React from 'react';
import styled from 'styled-components';

const Input = (
  { input, placeholder, type, meta: { touched, error }, showError }
) => (
  <Wrapper>
    <StyledInput
      error={showError && touched && error !== undefined && error !== true}
      {...input}
      type={type}
      placeholder={placeholder}
    />
    {showError &&
      touched &&
      error !== undefined &&
      error !== true &&
      <Error>{error}</Error>}
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
	position: relative;
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

const Error = styled.span`
	margin-left: 10px;
	color: #ff0033;
	font-size: 11px;
	font-weight: lighter;
	position: absolute;
	top: 40px;
	left: 0px;
`;

export default Input;
