import React from 'react';
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
          <StudentRow key={student._id} index={index} {...student} />
        ))}
    </Table.Body>
  );
};

export default Body;
