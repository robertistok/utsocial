import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Form, Button } from 'semantic-ui-react';

import InputField from '../../../FormComponents/InputField';

const NewMessageBox = (props) => {
  const { handleSubmit } = props;
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Field
        name="message"
        placeholder="Enter your message"
        component={InputField}
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
