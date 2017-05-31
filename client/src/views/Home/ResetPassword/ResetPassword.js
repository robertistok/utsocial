import React from 'react'; import PropTypes from 'prop-types'
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Input from '../elements/Input';
import SubmitButton from '../elements/SubmitButton';
import Form from '../elements/Form';
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
      {error !== true
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
        : <ReturnLink to="/">Return to the homepage</ReturnLink>}
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

const ReturnLink = styled(Link)`
	color: ${props => props.theme.white}
`;

export default ResetPassword;
