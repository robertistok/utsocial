import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import StandardInput from '../../../FormComponents/StandardInput';
import { requiredWithText } from '../../../FormComponents/validation';
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
    changePasswordStatus
  } = props;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <SettingTitle>Password</SettingTitle>
      {changePasswordStatus && changePasswordStatus.text}
      <FieldGroup>
        <StyledLabel htmlFor="oldPassword">Current password</StyledLabel>
        <CurrentPasswordWrapper>
          <Field
            name="oldPassword"
            type="password"
            placeholder="Current password..."
            component={StandardInput}
            validate={requiredWithText}
          />
          <ForgotPassword>Forogt password?</ForgotPassword>
        </CurrentPasswordWrapper>
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="newPassword">New password</StyledLabel>
        <Field
          name="newPassword"
          type="password"
          placeholder="New password..."
          component={StandardInput}
          validate={requiredWithText}
        />
      </FieldGroup>

      <FieldGroup>
        <StyledLabel htmlFor="verifyNewPassword">Verify password</StyledLabel>
        <Field
          name="verifyNewPassword"
          type="password"
          placeholder="Verify password..."
          component={StandardInput}
          validate={requiredWithText}
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

const { func, bool, string, shape } = React.PropTypes;
Password.propTypes = {
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

const CurrentPasswordWrapper = styled.div`
	position: relative;
`;

const ForgotPassword = styled.span`
	color: blue;
	position: absolute;
`;

export default Password;
