import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Loader, Message } from 'semantic-ui-react';

import { SEMIGROUP, DAYS, HOURS } from '../../../../utils/constants';
import RadioButton from '../../../common/Radio';
import DropDownField from '../../../common/Dropdown';
import InputWithLabel from '../../../common/InputWithLabel';
import { required } from '../../../common/validation';
import { teacherOptions, courseOptions, frequencyOptions } from './options';

const between = (min, max) =>
  (value, previousValue) =>
    parseFloat(value) <= parseFloat(max) && parseFloat(value) >= parseFloat(min)
      ? value
      : previousValue;

const AddScheduleForm = (props) => {
  const {
    selectedGroup,
    formValues,
    resetTypes,
    handleSubmit,
    error
  } = props;

  if (!selectedGroup) {
    return <Loader inverted>Loading</Loader>;
  }

  const selectedCourse = selectedGroup.courses.find(
    c => c._id === formValues.course
  );

  const renderTeachingTypes = () => {
    const { teachingTypes } = selectedCourse;
    return Object.keys(teachingTypes).map((type, index) => (
      <Field
        key={index}
        value={type}
        type="radio"
        name="type"
        disabled={!teachingTypes[type]}
        component={RadioButton}
        label={type}
        validate={required}
      />
    ));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Message error visible={!!error} header="Invalid form" content={error} />
      <Form.Group inline>
        <Field
          name="course"
          component={DropDownField}
          label="Course"
          placeholder="Select a course"
          options={selectedGroup.courses.map(courseOptions)}
          customOnChange={resetTypes}
          validate={required}
        />
        {formValues.course && renderTeachingTypes()}
      </Form.Group>
      <Form.Group inline>
        <label htmlFor="semigroup">Semigroup</label>
        <Field
          name="semigroup"
          component={RadioButton}
          label="Both"
          type="radio"
          value={SEMIGROUP.BOTH}
          validate={required}
        />
        <Field
          name="semigroup"
          component={RadioButton}
          label="SG1"
          type="radio"
          value={SEMIGROUP.FIRST}
        />
        <Field
          name="semigroup"
          component={RadioButton}
          label="SG2"
          type="radio"
          value={SEMIGROUP.SECOND}
        />
      </Form.Group>
      {formValues.type &&
        <Form.Group inline>
          <Field
            name="teacher"
            component={DropDownField}
            label="Teacher"
            placeholder="Select a course"
            options={selectedCourse.teachers[formValues.type].map(
              teacherOptions
            )}
            validate={required}
          />
        </Form.Group>}
      {formValues.teacher &&
        <Form.Group inline>
          <label htmlFor="when">When</label>
          <Field
            name="day"
            component={DropDownField}
            placeholder="Select a day"
            options={DAYS}
            validate={required}
          />
          {formValues.day &&
            <Field
              name="from"
              component={DropDownField}
              label="From"
              placeholder="Select an hour"
              options={HOURS}
              validate={required}
            />}
          {formValues.from &&
            <Field
              name="duration"
              label="Duration"
              type="number"
              normalize={between(1, 4)}
              placeholder="Select the duration"
              component={InputWithLabel}
              validate={required}
            />}
          {formValues.duration &&
            <Field
              name="frequency"
              component={DropDownField}
              label="Weeks"
              placeholder="Select the weeks"
              options={frequencyOptions()}
              validate={required}
            />}
        </Form.Group>}
      <Form.Group inline>
        {formValues.frequency &&
          <Field
            name="where"
            label="Where"
            type="text"
            placeholder="Type the location"
            component={InputWithLabel}
            validate={required}
          />}
      </Form.Group>
    </Form>
  );
};

const { object, func, bool } = PropTypes;
AddScheduleForm.propTypes = {
  formValues: object,
  selectedGroup: object,
  resetTypes: func,
  error: bool,
  handleSubmit: func.isRequired
};

AddScheduleForm.defaultProps = {
  formValues: {}
};

export default reduxForm({
  form: 'addScheduleModalForm'
})(AddScheduleForm);
