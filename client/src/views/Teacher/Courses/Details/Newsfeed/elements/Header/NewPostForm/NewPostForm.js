import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import Dropdown from '../../../../../../../../components/common/Dropdown';
import Checkbox from '../../../../../../../../components/common/Checkbox';
import { required } from '../../../../../../../../components/common/validation';
import {
  capitalizeFirstLetter
} from '../../../../../../../../utils/string-operations';
import DescriptionArea from './DescriptionArea';

const NewPostForm = (props) => {
  const {
    selectedCourseGroups,
    selectedCourseTeachingTypes,
    handleSubmit,
    onSubmit
  } = props;

  const groupOptions = [
    { key: 'all', text: 'All', value: 'all' },
    ...selectedCourseGroups.map(group => ({
      key: group._id,
      text: group.id,
      value: group._id
    }))
  ];
  const relatedOptions = [
    { key: 'general', text: 'General', value: 'general' },
    { key: 'attendance', text: 'Attendance', value: 'attendance' },
    { key: 'grades', text: 'Grades', value: 'grades' },
    ...Object.keys(selectedCourseTeachingTypes)
      .filter(type => selectedCourseTeachingTypes[type] === true)
      .map(type => ({
        key: type,
        text: capitalizeFirstLetter(type),
        value: type
      }))
  ];

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} size="small">
      <StyledFormGroup inline>
        <Field
          name="relatedTo"
          placeholder="Choose the relevance.."
          label="Related to"
          options={relatedOptions}
          component={Dropdown}
          validate={required}
        />
        <Field
          name="targetGroups"
          placeholder="Select groups.."
          label="Targeted groups"
          options={groupOptions}
          component={Dropdown}
          validate={required}
        />
        <Field
          name="includeTeachers"
          label="Include other teachers"
          component={Checkbox}
        />
      </StyledFormGroup>

      <StyledFormGroup className="description">
        <Field
          name="content"
          placeholder="Write your post here..."
          label="Content"
          component={DescriptionArea}
          validate={required}
        />
      </StyledFormGroup>

    </StyledForm>
  );
};

const { func, shape, string, bool, arrayOf, number } = PropTypes;
NewPostForm.propTypes = {
  onSubmit: func.isRequired,
  handleSubmit: func.isRequired,
  selectedCourseGroups: arrayOf(
    shape({ _id: string.isRequired, id: number.isRequired }).isRequired
  ).isRequired,
  selectedCourseTeachingTypes: shape({
    lab: bool,
    lecture: bool,
    project: bool,
    seminar: bool
  }).isRequired
};

const StyledForm = styled.form`
	width: 100%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px !important;
`;

const StyledFormGroup = styled.div`
	display: flex;
	margin: 15px 0px !important;
	width: 100%;
	justify-content: center;
	align-items: center;

	&.description {
		display: flex !important;
		flex-direction: column !important;

		div:first-of-type {
			margin-bottom: 20px !important;
		}
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

export default NewPostForm;
