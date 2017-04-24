import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';

import InputField from './InputField';
import TextArea from './TextArea';
import UsersField from './UsersField';
import { required } from '../../../FormComponents/validation';

const NewThreadForm = (props) => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="target"
        label="To"
        component={UsersField}
        {...props}
        validate={required}
      />
      <Field
        name="subject"
        type="text"
        label="Subject"
        component={InputField}
        validate={required}
      />
      <Field
        name="message"
        type="text"
        label="Message"
        placeholder="Enter your message..."
        component={TextArea}
        rows={15}
        validate={required}
      />
      <Button type="submit">Send message</Button>
    </Form>
  );
};

export default reduxForm({ form: 'newThreadForm' })(NewThreadForm);
