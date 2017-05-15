import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import InputField from '../../../../../FormComponents/InputField';
import TextArea from '../../../../../FormComponents/TextArea';

const NewMaterial = props => (
  <NewMaterialForm size="small">
    <Field
      name="link"
      label="Link"
      placeholder="Enter the link..."
      component={InputField}
    />
    <Field
      name="description"
      label="Description"
      placeholder="Enter a description..."
      component={TextArea}
      rows={5}
    />
    <Button type="Submit">Add</Button>
  </NewMaterialForm>
);

const NewMaterialForm = styled(Form)`
	height: 300px;
	width: 300px;
	padding: 10px;
	border: 1px solid grey;
`;

export default reduxForm({ form: 'newMaterialForm' })(NewMaterial);
