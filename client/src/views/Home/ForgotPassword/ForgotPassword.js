import React from 'react';
import { Field } from 'redux-form';

import Form from '../elements/Form';
import Input from '../elements/Input';
import SubmitButton from '../elements/SubmitButton';
import {
  StyledLink,
  StyledIcon,
  Description,
  Wrapper
} from '../elements/styled';

import { required, email } from '../../../components/FormComponents/validation';

const ForgotPassword = (props) => {
  const {
    pristine,
    submitting,
    valid,
    handleSubmit,
    onSubmit,
    forgotPassword: { status }
  } = props;

  return (
    <Wrapper>
      <Description>
        {status === undefined ? 'Enter your email address' : status}
      </Description>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledLink to="/">
          <StyledIcon name="close" size="big" />
        </StyledLink>
        <Field
          name="email"
          placeholder="Enter your e-mail address"
          type="text"
          component={Input}
          showError
          validate={[required, email]}
        />
        <SubmitButton type="submit" disabled={pristine || !valid || submitting}>
          Reset password
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default ForgotPassword;
