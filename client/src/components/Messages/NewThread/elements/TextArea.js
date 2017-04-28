import React from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';

const TextArea = styled.textarea`
	resize: none;

	&:focus {
		background-color: #FFFFFF !important;
	}
`;

const TextAreaField = (
  { input, placeholder, meta: { touched, error }, label, rows }
) => (
  <Form.Field error={touched && error} required>
    <label htmlFor={input.name}>{label}</label>
    <TextArea {...input} placeholder={placeholder} rows={rows} />
  </Form.Field>
);

export default TextAreaField;
