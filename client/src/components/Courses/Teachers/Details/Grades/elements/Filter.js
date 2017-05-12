import React from 'react';
import { Form } from 'semantic-ui-react';

const Filter = (props) => {
  const { courses: { selectedCourse }, selectedGroup } = props;
  const { changeGroup } = props;

  const groupOptions = selectedCourse.groups.map(group => ({
    key: group._id,
    text: group.id,
    value: group._id
  }));

  return (
    <Form>
      <Form.Group inline>
        <Form.Select
          options={groupOptions}
          placeholder="Group"
          onChange={(e, { value }) => changeGroup(value)}
          value={selectedGroup}
        />
      </Form.Group>
    </Form>
  );
};

export default Filter;
