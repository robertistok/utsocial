import React from 'react';
import { Form } from 'semantic-ui-react';

import { SEMIGROUP } from '../../../../../../constants';

const Filter = (props) => {
  const { courses: { selectedCourse } } = props;
  const { changeGroup, changeType, changeSemigroup } = props;
  const { course } = selectedCourse;

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

  const semigroupOptions = [
    { key: 'sgb', text: 'Both', value: SEMIGROUP.BOTH },
    { key: 'sg1', text: 'SG1', value: SEMIGROUP.FIRST },
    { key: 'sg2', text: 'SG2', value: SEMIGROUP.SECOND }
  ];

  return (
    <Form>
      <Form.Group inline>
        <Form.Select
          options={groupOptions}
          placeholder="Group"
          onChange={(e, { value }) => changeGroup(value)}
        />
        <Form.Select
          options={typeOptions}
          placeholder="Type"
          onChange={(e, { value }) => changeType(value)}
        />
        <Form.Select
          options={semigroupOptions}
          placeholder="Semigroup"
          onChange={(e, { value }) => changeSemigroup(value)}
        />
      </Form.Group>
    </Form>
  );
};

export default Filter;
