import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

const DescriptionArea = (
  { input, label, placeholder, meta: { touched, error } }
) => (
  <Form.Field error={touched && error}>
    <label htmlFor={input.name}>{label}</label>
    <StyledTextArea {...input} placeholder={placeholder} />
  </Form.Field>
);

const StyledTextArea = styled(TextArea)`
	width: 400px !important;
	padding: 10px !important;
	resize: none !important;
	min-height: 150px !important;
	border: 0 !important;
	background-color: #FFFFFF !important;
	border-bottom: 1px solid #ddd !important;

	&:focus {
		outline: none !important;
		border-color: #96c8da !important;
	}
`;

export default DescriptionArea;
