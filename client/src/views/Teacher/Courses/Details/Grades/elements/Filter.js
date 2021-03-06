import React from 'react';
import PropTypes from 'prop-types';

import { StyledDropdown } from '../../../../../../components/common/Dropdown';

const Filter = (props) => {
  const { courses: { selectedCourse }, selectedGroup } = props;
  const { changeGroup, fetchGradesTeachers } = props;

  const groupOptions = selectedCourse.groups.map(group => ({
    key: group._id,
    text: group.id,
    value: group._id
  }));

  return (
    <div>
      <StyledDropdown
        selection
        options={groupOptions}
        placeholder="Group"
        onChange={(e, { value }) => {
          changeGroup(value);
          fetchGradesTeachers(value, selectedCourse.course._id);
        }}
        value={selectedGroup}
      />
    </div>
  );
};

const { shape, func, string, object } = PropTypes;
Filter.propTypes = {
  changeGroup: func.isRequired,
  fetchGradesTeachers: func.isRequired,
  selectedGroup: string,
  courses: shape({
    selectedCourse: object.isRequired
  }).isRequired
};

export default Filter;
