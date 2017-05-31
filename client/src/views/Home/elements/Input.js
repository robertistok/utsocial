import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Input = (props) => {
  const {
    input,
    placeholder,
    type,
    meta: { touched, error, active, valid, asyncValidating },
    showError,
    validMessage
  } = props;

  const hasError = showError === true &&
    touched === true &&
    error !== undefined &&
    error !== true &&
    active !== true;
  const showValid = validMessage !== undefined &&
    valid === true &&
    active !== true &&
    asyncValidating !== true;

  return (
    <Wrapper>
      <StyledInput
        error={showError && touched && error !== undefined && error !== true}
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {hasError && <Status error><Icon name="remove" />{error}</Status>}
      {showValid && <Status><Icon name="checkmark" />{validMessage}</Status>}
    </Wrapper>
  );
};

const { shape, string, bool, oneOfType } = React.PropTypes;
Input.propTypes = {
  input: shape({ name: string.isRequired, value: string }).isRequired,
  placeholder: string,
  type: string.isRequired,
  showError: bool,
  validMessage: string,
  meta: shape({
    touched: bool.isRequired,
    error: oneOfType([string, bool]),
    asyncValidating: bool.isRequired,
    valid: bool.isRequired,
    active: bool.isRequired
  }).isRequired
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

const Status = styled.div`
	position: absolute;
	margin-left: 10px;
	color: ${props => props.error ? '#ff0033' : props.theme.primary}
	font-size: 11px;
	font-weight: lighter;
	top: 40px;
	left: 0px;
`;

export default Input;
