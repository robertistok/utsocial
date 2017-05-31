import React from 'react'; import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react';

const Filter = (props) => {
  const {
    courses: { selectedCourse: { course, groups } },
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

  const typeOptions = Object.keys(course).length === 0
    ? []
    : Object.keys(course.teachingTypes)
        .filter(type => course.teachingTypes[type] === true)
        .map(type => ({ key: type, text: type, value: type }));

  return (
    <Form>
      <Form.Group inline>
        <Form.Select
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
        <Form.Select
          options={typeOptions}
          placeholder="Type"
          onChange={(e, { value }) => {
            changeType(value);
            fetchAttendance({ type: value, course: course._id, group });
          }}
          value={type}
          disabled={group === undefined}
        />
      </Form.Group>
    </Form>
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

export default Filter;
