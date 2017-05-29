import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Form, Message, Button } from 'semantic-ui-react';

import { media } from '../../utils/style-utils';
import InputField from '../../components/FormComponents/InputField';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const StyledForm = styled(Form)`
	width: 400px;
	max-height: min-content;
	${media.tablet`width: 300px`}
	${media.phone`width: 90%`}
`;

const LoginButton = styled(Button)`
	margin: auto;
	width: 100%;
`;

const LoginForm = (props) => {
  const { handleSubmit, auth } = props;
  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        {!auth.authenticated &&
          auth.error &&
          <Message negative>
            <Message.Header>
              {auth.error}
            </Message.Header>
            <p>Try again</p>
          </Message>}
        <Field
          name="username"
          label="User"
          placeholder="Username, email or phone-number"
          type="text"
          component={InputField}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          component={InputField}
        />
        <LoginButton>Log In</LoginButton>
      </StyledForm>
    </Wrapper>
  );
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
