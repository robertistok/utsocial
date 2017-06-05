import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import StandardInput from '../../../FormComponents/StandardInput';
import {
  // matchingPasswords,
  required
} from '../../../FormComponents/validation';
import {
  SettingTitle,
  StyledForm,
  FieldGroup,
  StyledLabel,
  SaveButton
} from '../styled';

const Password = (props) => {
  const {
    handleSubmit,
    onSubmit,
    pristine,
    valid,
    submitting,
    passwordStatus
  } = props;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <SettingTitle>Password</SettingTitle>
      {passwordStatus && passwordStatus.status}
      <FieldGroup style={{ marginBottom: 23 }}>
        <StyledLabel htmlFor="oldPassword">Current password</StyledLabel>
        <CurrentPasswordWrapper>
          <Field
            name="oldPassword"
            type="password"
            placeholder="Current password..."
            component={StandardInput}
            validate={required}
          />
          <ForgotPassword>Forgot password?</ForgotPassword>
        </CurrentPasswordWrapper>
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="newPassword">New password</StyledLabel>
        <Field
          name="newPassword"
          type="password"
          placeholder="New password..."
          component={StandardInput}
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="verifyNewPassword">Verify password</StyledLabel>
        <Field
          name="verifyNewPassword"
          type="password"
          placeholder="Verify password..."
          component={StandardInput}
          // validate={matchingPasswords}
          showError
          validMessage="Passwords match"
        />
      </FieldGroup>
      <FieldGroup>
        <SaveButton type="submit" disabled={pristine || !valid || submitting}>
          Save changes
        </SaveButton>
      </FieldGroup>
    </StyledForm>
  );
};

const { func, bool, string, shape } = PropTypes;
Password.propTypes = {
  pristine: bool.isRequired,
  valid: bool.isRequired,
  submitting: bool.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  passwordStatus: shape({
    error: bool.isRequired,
    status: string,
    loading: bool.isRequired
  })
};

const CurrentPasswordWrapper = styled.div`
	position: relative;
`;

const ForgotPassword = styled.span`
	color: ${props => props.theme.secondary};
	position: absolute;
	font-size: 11px;
	left: 15px;
	bottom: -20px;

	@media screen and (max-width: 500px) {
		bottom: -25px;
	}
`;

export default Password;
