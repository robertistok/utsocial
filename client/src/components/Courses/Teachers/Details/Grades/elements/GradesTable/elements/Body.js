import React from 'react';
import { Table } from 'semantic-ui-react';

import StudentRow from './StudentRow';

const Body = (props) => {
  const {
    students,
    types,
    gradesList,
    numberOfGrades
  } = props;

  return (
    <Table.Body>
      {students
        .slice()
        .sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .map((student, index) => (
          <StudentRow
            key={student._id}
            index={index}
            types={types}
            gradesList={gradesList[student._id]}
            numberOfGrades={numberOfGrades}
            {...student}
          />
        ))}
    </Table.Body>
  );
};

const { arrayOf, string, object } = React.PropTypes;
Body.propTypes = {
  numberOfGrades: object,
  students: arrayOf(object),
  types: arrayOf(string),
  gradesList: object
};

export default Body;
