import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import StandardInput from '../../../common/StandardInput';
import SubmitButton from '../../../common/SubmitButton';
import { required } from '../../../common/validation';
import {
  SettingTitle,
  StyledForm,
  FieldGroup,
  StyledLabel,
  Status
} from '../common';

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
      {passwordStatus &&
        passwordStatus.status !== undefined &&
        <Status {...passwordStatus} />}

      <FieldGroup style={{ marginBottom: 23 }}>
        <StyledLabel htmlFor="oldPassword">Current password</StyledLabel>
        <Field
          name="oldPassword"
          type="password"
          placeholder="Current password..."
          component={StandardInput}
          validate={required}
        />
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
          showError
          validMessage="Passwords match"
        />
      </FieldGroup>
      <FieldGroup>
        <SubmitButton
          className="confirmation"
          type="submit"
          disabled={pristine || !valid || submitting}
        >
          Save changes
        </SubmitButton>
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

export default Password;
