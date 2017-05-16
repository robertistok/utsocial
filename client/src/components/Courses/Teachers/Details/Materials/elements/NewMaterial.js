import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import InputField from '../../../../../FormComponents/InputField';
import TextArea from '../../../../../FormComponents/TextArea';

let NewMaterial = (props) => {
  const { handleSubmit, type, submitSucceeded, reset } = props;

  return (
    <NewMaterialForm onSubmit={handleSubmit} size="small">
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
      <ButtonGroup>
        <StyledButton positive type="Submit">Add</StyledButton>
        <StyledButton negative type="button" onClick={reset}>
          Reset
        </StyledButton>
      </ButtonGroup>
    </NewMaterialForm>
  );
};

const NewMaterialForm = styled(Form)`
	height: 280px;
	width: 300px;
	padding: 10px;
	margin:10px;
	border: 1px solid grey;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-around;
`;

const StyledButton = styled(Button)`
	width: 100px;
`;

NewMaterial = reduxForm({
  form: 'newMaterialForm'
})(NewMaterial);

const mapStateToProps = (state, props) => ({
  initialValues: {
    type: props.type
  }
});

export default connect(mapStateToProps)(NewMaterial);
