import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import InputField from './elements/InputField';
import MessageBox from './elements//MessageBox';
import UsersField from './elements/UsersField';
import { required } from '../../common/validation';
import SubmitButton from '../../common/SubmitButton';
import cancelLogo from '../../../assets/cancel.svg';

const NewThreadForm = (props) => {
  const {
    handleSubmit,
    returnToOnCancel,
    onSubmit,
    valid,
    submitting,
    pristine
  } = props;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledLink to={returnToOnCancel()}>
        <Logo src={cancelLogo} alt="cancel" />
      </StyledLink>
      <Field
        name="target"
        component={UsersField}
        placeholder="To"
        {...props}
        validate={required}
      />
      <Field
        name="subject"
        type="text"
        placeholder="Subject"
        component={InputField}
        validate={required}
      />
      <Field
        name="message"
        type="text"
        label="Message"
        placeholder="Enter your message..."
        component={MessageBox}
        validate={required}
      />
      <StyledSubmitButton
        className="confirmation"
        disabled={pristine || !valid || submitting}
        type="submit"
        icon="compose"
        content="Send"
      />
    </StyledForm>
  );
};

const { func, bool } = PropTypes;
NewThreadForm.propTypes = {
  handleSubmit: func.isRequired,
  returnToOnCancel: func.isRequired,
  onSubmit: func.isRequired,
  valid: bool.isRequired,
  submitting: bool.isRequired,
  pristine: bool.isRequired
};

const StyledForm = styled.form`
	position: relative;
	display: flex;
	flex-direction: column;
	flex-grow: 2;
	flex-basis: 66.6666%;
	height: 100%;
	background-color: #FFFFFF;
	color: ${props => props.theme.secondary}
	padding: 25px 70px 20px 70px;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 500px) {
		padding: 25px 40px 20px 40px;
	}

	@media screen and (max-width: 400px) {
		padding: 25px 20px 20px 20px;
	}
`;

const StyledLink = styled(Link)`
	margin: 15px;
	height: 15px;
	width: 15px;
	position: absolute;
	top: 0px;
	right: 0px;
`;

const Logo = styled.img`
	width: 15px;
	height: 15px;
`;

const StyledSubmitButton = styled(SubmitButton)`
	margin: 10px auto !important;
`;

export default NewThreadForm;
