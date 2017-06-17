import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { StyledButton, ButtonGroup } from './styled-components';
import StandardInput from '../../../../../../components/common/StandardInput';
import { required } from '../../../../../../components/common/validation';

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
        <FieldGroup>
          <Label>Description</Label>
          <Field
            autoFocus
            name="link"
            label="Link"
            placeholder="Enter the link..."
            type="text"
            component={StandardInput}
            fluid
            validate={required}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Description</Label>
          <Field
            name="description"
            label="Description"
            placeholder="Enter a description..."
            type="text"
            component={StandardInput}
            fluid
            validate={required}
          />
        </FieldGroup>
        <ButtonGroup>
          <StyledButton
            className="confirmation"
            disabled={pristine || submitting || invalid}
            type="Submit"
            content={positiveButton}
          />
          <StyledButton
            disabled={submitting || (newMaterial && pristine)}
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

const { func, string, bool } = PropTypes;
MaterialForm.propTypes = {
  reset: func.isRequired,
  handleSubmit: func.isRequired,
  submitForm: func.isRequired,
  onNegativeButtonClick: func,
  positiveButton: string.isRequired,
  negativeButton: string.isRequired,
  submitting: bool.isRequired,
  pristine: bool.isRequired,
  invalid: bool.isRequired,
  newMaterial: bool
};

const Wrapper = styled.div`
	height: 300px;
	width: 300px;
	padding: 20px;
	box-shadow: 1px 5px 5px #888888
	background-color: #FFFFFF;

	align-self: ${props => props.newMaterial ? 'center' : ''}
	margin-top: ${props => props.newMaterial ? '30px' : '0px'}

`;

const StyledForm = styled.form`
	position: relative;
	width: 100%;
	height: 100%;
`;

const FieldGroup = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
`;

const Label = styled.span`
	display: inline-block;
	margin-left: 5px;
	margin-bottom: 10px;
`;

const mapStateToProps = state => ({
  selectedCourse: state.courses.selectedCourse
});

const enhance = compose(connect(mapStateToProps), reduxForm({}));

export default enhance(MaterialForm);
