import React from 'react';
import { Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import InputField from '../../../../../../FormComponents/InputField';
import TextArea from '../../../../../../FormComponents/TextArea';

const NewMaterial = (props) => {
  const { handleSubmit, reset, pristine, submitting, onSubmit } = props;
  console.log(props);

  return (
    <NewMaterialForm onSubmit={handleSubmit(onSubmit)} size="small">
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
        component={InputField}
      />
      <ButtonGroup>
        <StyledButton
          disabled={pristine || submitting}
          positive
          type="Submit"
          content="Add"
        />
        <StyledButton
          disabled={pristine || submitting}
          negative
          type="button"
          content="Reset"
          onClick={reset}
        />
      </ButtonGroup>
    </NewMaterialForm>
  );
};

const NewMaterialForm = styled(Form)`
	height: 200px;
	width: 300px;
	margin-top: 30px;
	border: 1px solid grey;
	align-self: center;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-around;
`;

const StyledButton = styled(Button)`
	width: 100px;
`;

export default NewMaterial;
