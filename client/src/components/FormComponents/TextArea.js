import React from 'react';
import { Form } from 'semantic-ui-react';

const TextArea = (
  { input, placeholder, meta: { touched, error }, width, rows }
) => (
  <Form.Field error={touched && error} width={width}>
    <textarea {...input} placeholder={placeholder} rows={rows} />
  </Form.Field>
);

export default TextArea;
