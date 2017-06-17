import React from 'react';
import PropTypes from 'prop-types';

import { StyledDropdown } from '../../../../../../components/common/Dropdown';
import {
  capitalizeFirstLetter
} from '../../../../../../utils/string-operations';

const Filter = (props) => {
  const {
    courses: { selectedCourse: { course } },
    filter: { type },
    changeType,
    fetchAttendance,
    studentID
  } = props;

  const typeOptions = Object.keys(course).length === 0
    ? []
    : Object.keys(course.teachingTypes)
        .filter(type => course.teachingTypes[type] === true)
        .map(type => ({
          key: type,
          text: capitalizeFirstLetter(type),
          value: type
        }));

  return (
    <div>
      <StyledDropdown
        selection
        options={typeOptions}
        placeholder="Type"
        onChange={(e, { value }) => {
          changeType(value);
          fetchAttendance({ type: value, course, studentID });
        }}
        value={type}
      />
    </div>
  );
};

const { arrayOf, func, shape, string } = PropTypes;
Filter.propTypes = {
  studentID: string.isRequired,
  changeType: func.isRequired,
  fetchAttendance: func.isRequired,
  filter: shape({
    type: string,
    group: string
  }).isRequired,
  courses: shape({
    selectedCourse: shape({
      course: shape({
        _id: string.isRequired
      }).isRequired,
      groups: arrayOf(
        shape({
          _id: string.isRequired
        })
      ).isRequired
    }).isRequired
  })
};

export default Filter;
