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
    forgotPasswordState: { status }
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
          validMessage="Email found"
          validate={[required, email]}
        />
        <SubmitButton type="submit" disabled={pristine || !valid || submitting}>
          Reset password
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

const { bool, func, shape, string } = React.PropTypes;
ForgotPassword.propTypes = {
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  forgotPasswordState: shape({ status: string }).isRequired
};

export default ForgotPassword;
