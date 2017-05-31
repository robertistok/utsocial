import React from 'react'; import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react';

import StudentRow from './StudentRow';

const Body = (props) => {
  const {
    students,
    dates,
    attendanceList,
    addAttendance,
    removeAttendance
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
            {...student}
            dates={dates}
            addAttendance={addAttendance}
            removeAttendance={removeAttendance}
            attendanceList={attendanceList.filter(
              item => item.student === student._id
            )}
          />
        ))}
    </Table.Body>
  );
};

const { shape, string, arrayOf, func } = PropTypes;
Body.propTypes = {
  students: arrayOf(
    shape({
      name: string.isRequired
    })
  ).isRequired,
  dates: arrayOf(
    shape({
      day: string.isRequired
    })
  ),
  addAttendance: func.isRequired,
  removeAttendance: func.isRequired,
  attendanceList: arrayOf(
    shape({
      student: string.isRequired
    })
  ).isRequired
};

export default Body;
