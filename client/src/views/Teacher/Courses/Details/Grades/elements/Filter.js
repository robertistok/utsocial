import React from 'react';
import { Form } from 'semantic-ui-react';

const Filter = (props) => {
  const { courses: { selectedCourse }, selectedGroup } = props;
  const { changeGroup, fetchGradesTeachers } = props;

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
          onChange={(e, { value }) => {
            changeGroup(value);
            fetchGradesTeachers(value, selectedCourse.course._id);
          }}
          value={selectedGroup}
        />
      </Form.Group>
    </Form>
  );
};

const { shape, func, string, object } = React.PropTypes;
Filter.propTypes = {
  changeGroup: func.isRequired,
  fetchGradesTeachers: func.isRequired,
  selectedGroup: string,
  courses: shape({
    selectedCourse: object.isRequired
  }).isRequired
};

export default Filter;
