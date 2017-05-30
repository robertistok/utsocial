import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

import { media } from '../../utils/style-utils';
import Input from './elements/Input';
import Checkbox from './elements/Checkbox';
import AuthError from './elements/AuthError';
import { required } from '../../components/FormComponents/validation';

const LoginForm = (props) => {
  const { handleSubmit, auth, pristine, valid, submitting, onSubmit } = props;
  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {!auth.authenticated && auth.error && <AuthError error={auth.error} />}
        <Field
          name="username"
          label="User"
          placeholder="Username, email or phone"
          type="text"
          component={Input}
          validate={required}
          autoFocus
        />
        <Field
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          component={Input}
          validate={required}
        />
        <ActionWrapper>
          <Field name="remember" label="Remember me" component={Checkbox} />
          <ForgotPassword>Forgot password?</ForgotPassword>
        </ActionWrapper>
        <LoginButton disabled={pristine || submitting || !valid}>
          Log In
        </LoginButton>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	background-color: ${props => props.theme.primary}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	width: 450px;
	height: min-content;
	box-shadow: 3px 5px 5px #888888;

	padding: 30px;

	@media screen and (max-width: 600px) {
		width: 350px;
	}

	${media.phone`
		width: 90%
		font-size: 12px;
		padding: 15px;
	`}
`;

const ActionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 5px 25px;
	font-size: 12px;

	${media.phone`
		width: 90%
		font-size: 10px;
		flex-direction: column;
		align-items: space-between;
		margin: 10px auto;
		height: 50px;
	`}
`;

const LoginButton = styled(Button)`
	margin: 20px auto !important;
	width: 90%;
	height: 40px;
	background-color: ${props => props.theme.primary} !important;
	color: ${props => props.theme.white} !important;
`;

const ForgotPassword = styled.span`
	color: ${props => props.theme.secondary};

	&:hover {
		cursor: pointer;
	}
`;

export default LoginForm;
