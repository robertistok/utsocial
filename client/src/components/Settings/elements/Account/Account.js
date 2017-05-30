import React from 'react';
import { Field } from 'redux-form';

import StandardInput from '../../../FormComponents/StandardInput';
import { requiredWithText } from '../../../FormComponents/validation';
import {
  SettingTitle,
  FieldGroup,
  StyledLabel,
  SaveButton,
  StyledForm
} from '../styled';

const Account = (props) => {
  const {
    handleSubmit,
    onSubmit,
    pristine,
    valid,
    submitting,
    reset,
    changeAccountStatus
  } = props;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <SettingTitle>Account</SettingTitle>
      {changeAccountStatus && changeAccountStatus.text}
      <FieldGroup>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <Field
          name="username"
          type="text"
          component={StandardInput}
          validate={requiredWithText}
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Field
          name="email"
          type="text"
          component={StandardInput}
          validate={requiredWithText}
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
        />
      </FieldGroup>
      <FieldGroup>
        <SaveButton type="submit" disabled={pristine || !valid || submitting}>
          Save changes
        </SaveButton>
        <SaveButton type="button" disabled={pristine} onClick={reset}>
          Reset
        </SaveButton>
      </FieldGroup>
    </StyledForm>
  );
};

const { func, bool, string, shape, number } = React.PropTypes;
Account.propTypes = {
  pristine: bool.isRequired,
  valid: bool.isRequired,
  submitting: bool.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  reset: func.isRequired,
  changeAccountStatus: shape({
    validation: shape({
      username: string,
      phone: number,
      email: string
    }),
    error: bool,
    text: string,
    loading: bool
  })
};

export default Account;