import React from 'react';
import styled from 'styled-components';

const StandardInput = (
  { input, placeholder, type, meta: { touched, error }, maxLength }
) => (
  <Wrapper>
    <StyledInput
      {...input}
      type={type}
      placeholder={placeholder}
      error={touched && error}
      maxLength={maxLength}
    />
    {touched && error && <Error>{error}</Error>}
  </Wrapper>
);

const { shape, string, bool, number, oneOfType } = React.PropTypes;
StandardInput.propTypes = {
  input: shape({
    name: string.isRequired,
    value: oneOfType([string, number])
  }).isRequired,
  placeholder: string,
  meta: shape({ touched: bool, error: oneOfType([bool, string]) }).isRequired,
  type: string.isRequired,
  maxLength: number
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const StyledInput = styled.input`
	outline: none;
	border: 1px solid #e6ecf0;
	width: 200px;
	height: 40px
	padding: 5px 10px;

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
`;

export default StandardInput;
