import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { media } from '../../../utils/style-utils';
import Form from '../elements/Form';
import Input from '../elements/Input';
import Checkbox from '../elements/Checkbox';
import AuthError from '../elements/AuthError';
import SubmitButton from '../elements/SubmitButton';
import { Description, Wrapper } from '../elements/styled';
import { required } from '../../../components/FormComponents/validation';

const LoginForm = (props) => {
  const {
    handleSubmit,
    auth,
    pristine,
    valid,
    submitting,
    onSubmit,
    showForgotPassword
  } = props;
  return (
    <Wrapper>
      <Description>Log in in order to access your account</Description>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!auth.authenticated && auth.error && <AuthError error={auth.error} />}
        <Field
          name="username"
          label="User"
          placeholder="Username, email or phone"
          type="text"
          component={Input}
          validate={required}
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
          <Link to="/forgot">
            <ForgotPassword onClick={showForgotPassword}>
              Forgot password?
            </ForgotPassword>
          </Link>
        </ActionWrapper>
        <SubmitButton type="submit" disabled={pristine || submitting || !valid}>
          Log In
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

const { func, shape, bool, string } = React.PropTypes;
LoginForm.propTypes = {
  showForgotPassword: func.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  pristine: bool.isRequired,
  valid: bool.isRequired,
  submitting: bool.isRequired,
  auth: shape({ error: string, authenticated: bool.isRequired }).isRequired
};

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

const ForgotPassword = styled.span`
	color: ${props => props.theme.secondary};

	&:hover {
		cursor: pointer;
	}
`;

export default LoginForm;
