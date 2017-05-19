import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { StyledButton, ButtonGroup } from './styled-components';
import InputField from '../../../../../FormComponents/InputField';
import { required } from '../../../../../FormComponents/validation';

const MaterialForm = (props) => {
  const {
    positiveButton,
    negativeButton,
    onNegativeButtonClick,
    handleSubmit,
    submitForm,
    reset,
    pristine,
    submitting,
    invalid,
    newMaterial
  } = props;

  const onFormSubmit = (values) => {
    submitForm(values);
    if (newMaterial) {
      reset();
    }
  };

  return (
    <Wrapper newMaterial={newMaterial}>
      <StyledForm onSubmit={handleSubmit(onFormSubmit)} size="small">
        <Field
          autoFocus
          name="link"
          label="Link"
          placeholder="Enter the link..."
          component={InputField}
          validate={required}
        />
        <Field
          name="description"
          label="Description"
          placeholder="Enter a description..."
          component={InputField}
          validate={required}
        />
        <ButtonGroup>
          <StyledButton
            disabled={pristine || submitting || invalid}
            positive
            type="Submit"
            content={positiveButton}
          />
          <StyledButton
            disabled={submitting || (newMaterial && pristine)}
            negative
            type="button"
            content={negativeButton}
            onClick={() =>
              onNegativeButtonClick !== undefined
                ? onNegativeButtonClick()
                : reset()}
          />
        </ButtonGroup>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	height: 200px;
	width: 300px;
	padding: 20px;
	border: 1px solid grey;
	box-shadow: 1px 5px 5px #888888

	align-self: ${props => props.newMaterial ? 'center' : ''}
	margin-top: ${props => props.newMaterial ? '30px' : '0px'}

`;

const StyledForm = styled(Form)`

`;

const mapStateToProps = state => ({
  selectedCourse: state.courses.selectedCourse
});

const enhance = compose(connect(mapStateToProps), reduxForm({}));

export default enhance(MaterialForm);
