import React from 'react';
import { Form } from 'semantic-ui-react';

const Filter = (props) => {
  const { courses: { selectedCourse }, filter } = props;
  const { changeGroup, changeType, fetchAttendance } = props;
  const { course } = selectedCourse;
  const { type, group } = filter;

  const groupOptions = selectedCourse.groups.map(group => ({
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
              fetchAttendance(type, selectedCourse.course._id, value);
            }
          }}
          value={group}
        />
        <Form.Select
          options={typeOptions}
          placeholder="Type"
          onChange={(e, { value }) => {
            changeType(value);
            fetchAttendance(value, selectedCourse.course._id, group);
          }}
          value={type}
          disabled={group === undefined}
        />
      </Form.Group>
    </Form>
  );
};

export default Filter;
