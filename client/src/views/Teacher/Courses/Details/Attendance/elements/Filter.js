import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledDropdown } from '../../../../../../components/common/Dropdown';

const Filter = (props) => {
  const {
    courses: { selectedCourse: { course, groups, schedules } },
    filter: { type, group },
    changeGroup,
    changeType,
    fetchAttendance
  } = props;

  const groupOptions = groups.map(group => ({
    key: group._id,
    text: group.id,
    value: group._id
  }));

  const typeOptions = schedules
    .reduce(
      (acc, item) => acc.indexOf(item.type) === -1 ? [...acc, item.type] : acc,
      []
    )
    .map(type => ({ key: type, text: type, value: type }));

  return (
    <Wrapper>
      <StyledDropdown
        selection
        options={groupOptions}
        placeholder="Group"
        onChange={(e, { value }) => {
          changeGroup(value);
          if (type !== undefined) {
            fetchAttendance({ type, course: course._id, group: value });
          }
        }}
        value={group}
      />
      <StyledDropdown
        selection
        options={typeOptions}
        placeholder="Type"
        onChange={(e, { value }) => {
          changeType(value);
          fetchAttendance({ type: value, course: course._id, group });
        }}
        value={type}
        disabled={group === undefined}
      />
    </Wrapper>
  );
};

const { arrayOf, func, shape, string } = PropTypes;
Filter.propTypes = {
  changeGroup: func.isRequired,
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

const Wrapper = styled.div`
	display: flex;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
	}
`;

export default Filter;
