import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import GradeRow from '../../../../../../../../components/Grades/GradeRow';
import GradeItem from './GradeItem/index';

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
          <GradeRow
            key={student._id}
            index={index}
            types={types}
            gradesList={gradesList[student._id]}
            numberOfGrades={numberOfGrades}
            component={GradeItem}
            withName
            numbered
            {...student}
          />
        ))}
    </Table.Body>
  );
};

const { arrayOf, string, object } = PropTypes;
Body.propTypes = {
  numberOfGrades: object,
  students: arrayOf(object),
  types: arrayOf(string),
  gradesList: object
};

export default Body;
