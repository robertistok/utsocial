import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Input from '../elements/Input';
import SubmitButton from '../elements/SubmitButton';
import Form from '../elements/Form';
import ReturnLink from '../elements/ReturnLink';
import {
  StyledLink,
  StyledIcon,
  Description,
  Wrapper
} from '../elements/styled';
import { required } from '../../../components/FormComponents/validation';

const ResetPassword = (props) => {
  const {
    handleSubmit,
    onSubmit,
    pristine,
    valid,
    submitting,
    forgotPasswordState: { error, status }
  } = props;

  return (
    <Wrapper>
      <Description>
        {status !== undefined ? status : 'Enter your new password'}
      </Description>
      {error !== true ||
        status === 'Your password was changed succesfully, you can now sign in.'
        ? <Form onSubmit={handleSubmit(onSubmit)}>
            <StyledLink to="/">
              <StyledIcon name="close" size="big" />
            </StyledLink>
            <Field
              name="newPassword"
              placeholder="Enter your new password"
              type="password"
              component={Input}
              validate={[required]}
            />
            <Field
              name="verifyNewPassword"
              placeholder="Confirm your password"
              type="password"
              component={Input}
              showError
              validMessage="Passwords match"
              validate={[required]}
            />
            <SubmitButton
              type="submit"
              disabled={pristine || !valid || submitting}
            >
              Change password
            </SubmitButton>
          </Form>
        : <ReturnLink content="Return to the login page" />}
    </Wrapper>
  );
};

const { bool, func, shape, string } = PropTypes;
ResetPassword.propTypes = {
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  forgotPasswordState: shape({ status: string }).isRequired
};

export default ResetPassword;
