import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

import ExpandableTextArea from '../../../common/ExpandableTextArea';
import { required } from '../../../common/validation';

const NewMessageBox = (props) => {
  const { handleSubmit, fields, pristine, valid, submitting } = props;

  const isActive = fields !== undefined &&
    fields.message !== undefined &&
    fields.message.active === true;

  return (
    <StyledForm onSubmit={handleSubmit} isActive={isActive}>
      <Field
        name="message"
        placeholder="Enter your message"
        component={ExpandableTextArea}
        type="text"
        validation={required}
        rows={isActive ? 5 : 1}
      />
      <SubmitButton
        disabled={pristine || !valid || submitting}
        content="Send"
      />

    </StyledForm>
  );
};

const { func, bool, shape } = PropTypes;
NewMessageBox.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  fields: shape({ message: shape({ active: bool }) })
};

const StyledForm = styled.form`
	position: relative;
	height: ${props => props.isActive ? '130px' : '40px'};
	display: flex;
	width: 100%;

	@media screen and (max-width: 768px) {
		font-size: 13px !important;
	}

	@media screen and (max-width: 500px) {
		font-size: 12px !important;
	}
`;

const SubmitButton = styled(Button)`
	margin-top: auto !important;
	position: absolute;
	right: 0px;
	bottom: 0px;
	margin-right: 0px !important;
	border-radius: inherit !important;

	width: 100px;
	height: 40px;
	background-color: ${props => props.theme.primary} !important;
	color: ${props => props.theme.white} !important;

	@media screen and (max-width: 768px) {
		font-size: 13px !important;
		width: 75px;
	}

	@media screen and (max-width: 500px) {
		font-size: 12px !important;
		width: 50px;
	}
`;

export default reduxForm({ form: 'newMessageForm' })(NewMessageBox);
