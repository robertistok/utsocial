import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import BorderedInput from '../../../FormComponents/BorderedInput';
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
    reset
  } = props;

  return (
    <StyledForm>
      <SettingTitle>Account</SettingTitle>
      <FieldGroup>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <Field
          name="username"
          type="text"
          component={BorderedInput}
          validate={requiredWithText}
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Field
          name="email"
          type="text"
          component={BorderedInput}
          validate={requiredWithText}
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="phone">Phone</StyledLabel>
        <Field
          name="phone"
          type="text"
          component={BorderedInput}
          validate={requiredWithText}
          maxLength={11}
        />
      </FieldGroup>
      <FieldGroup>
        <SaveButton type="submit" disabled={pristine || !valid || submitting}>
          Save changes
        </SaveButton>
        <SaveButton type="button" onClick={reset}>
          Reset
        </SaveButton>
      </FieldGroup>
    </StyledForm>
  );
};

const { func, bool, string, shape } = React.PropTypes;
Account.propTypes = {
  pristine: bool.isRequired,
  valid: bool.isRequired,
  submitting: bool.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  changePasswordStatus: shape({
    error: bool.isRequired,
    text: string.isRequired
  })
};

export default Account;
