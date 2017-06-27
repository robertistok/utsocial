import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import StandardInput from '../../../common/StandardInput';
import SubmitButton from '../../../common/SubmitButton';
import { requiredWithText } from '../../../common/validation';
import {
  SettingTitle,
  FieldGroup,
  StyledLabel,
  StyledForm,
  Status
} from '../common';

const Account = (props) => {
  const {
    handleSubmit,
    onSubmit,
    pristine,
    valid,
    submitting,
    reset,
    accountStatus
  } = props;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <SettingTitle>Account</SettingTitle>
      {accountStatus &&
        accountStatus.status !== undefined &&
        <Status {...accountStatus} />}
      <FieldGroup>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <Field
          name="username"
          type="text"
          component={StandardInput}
          validate={requiredWithText}
          showError
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Field
          name="email"
          type="text"
          component={StandardInput}
          validate={requiredWithText}
          showError
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="phone">Phone</StyledLabel>
        <Field
          name="phone"
          type="text"
          component={StandardInput}
          validate={requiredWithText}
          maxLength={11}
          showError
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
        <SubmitButton type="button" onClick={reset}>
          Reset
        </SubmitButton>
      </FieldGroup>
    </StyledForm>
  );
};

const { func, bool, string, shape, number } = PropTypes;
Account.propTypes = {
  pristine: bool.isRequired,
  valid: bool.isRequired,
  submitting: bool.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  reset: func.isRequired,
  accountStatus: shape({
    validation: shape({
      username: string,
      phone: number,
      email: string
    }),
    error: bool.isRequired,
    status: string,
    loading: bool.isRequired
  })
};

export default Account;
