import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Loader } from 'semantic-ui-react';

import { SEMIGROUP, FREQUENCY, DAYS, HOURS } from '../../../../constants';
import RadioButton from '../../../FormComponents/Radio';
import DropDownField from '../../../FormComponents/Dropdown';
import InputField from '../../../FormComponents/InputField';
import { teacherOptions, courseOptions, frequencyOptions } from './options';

const between = (min, max) =>
  (value, previousValue) =>
    parseFloat(value) <= parseFloat(max) && parseFloat(value) >= parseFloat(min)
      ? value
      : previousValue;

const NewScheduleForm = (props) => {
  const {
    selectedGroup,
    formValues,
    resetTypes
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
        name="subjectType"
        disabled={!teachingTypes[type]}
        component={RadioButton}
        label={type}
      />
    ));
  };

  return (
    <Form>
      <Form.Group inline>
        <label htmlFor="semigroup">Semigroup</label>
        <Field
          name="semigroup"
          component={RadioButton}
          label="Both"
          type="radio"
          value={SEMIGROUP.BOTH}
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
      <Form.Group inline>
        <Field
          name="course"
          component={DropDownField}
          label="Course"
          placeholder="Select a course"
          options={selectedGroup.courses.map(courseOptions)}
          customOnChange={resetTypes}
        />
        {formValues.course && renderTeachingTypes()}
      </Form.Group>
      {formValues.subjectType &&
        <Form.Group inline>
          <Field
            name="teacher"
            component={DropDownField}
            label="Teacher"
            placeholder="Select a course"
            options={selectedCourse.teachers[formValues.subjectType].map(
              teacherOptions
            )}
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
          />
          {formValues.day &&
            <Field
              name="from"
              component={DropDownField}
              label="From"
              placeholder="Select an hour"
              options={HOURS}
            />}
          {formValues.from &&
            <Field
              name="duration"
              label="Duration"
              type="number"
              normalize={between(1, 4)}
              component={InputField}
            />}
          {formValues.duration &&
            <Field
              name="frequency"
              component={DropDownField}
              label="Weeks"
              placeholder="Select the weeks"
              options={frequencyOptions()}
            />}
        </Form.Group>}
    </Form>
  );
};

NewScheduleForm.propTypes = {
  formValues: PropTypes.object,
  selectedGroup: PropTypes.object,
  resetTypes: PropTypes.func
};

NewScheduleForm.defaultProps = {
  formValues: {}
};

export default reduxForm({
  form: 'addScheduleModalForm'
})(NewScheduleForm);
