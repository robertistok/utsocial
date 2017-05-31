import React from 'react'; import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Form, Button } from 'semantic-ui-react';

import InputWithLabel from '../../../FormComponents/InputWithLabel';

const NewMessageBox = (props) => {
  const { handleSubmit } = props;
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Field
        name="message"
        placeholder="Enter your message"
        component={InputWithLabel}
        type="text"
        rows={1}
      />
      <Button>Send message</Button>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
	height: 40px;
	display: flex;
	width: 100%;

	:first-child {
		flex: 4;
	}
`;

export default reduxForm({ form: 'newMessageForm' })(NewMessageBox);
