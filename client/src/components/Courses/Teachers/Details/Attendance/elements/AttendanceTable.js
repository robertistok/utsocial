import React from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';

import StudentRow from './StudentRow';
import { getDatesForSchedules } from '../../../../../../utils/date';

const AttendanceTable = (props) => {
  const { courses, attendance } = props;
  const { selectedCourse } = courses;
  const day = selectedCourse.schedules.find(
    schedule =>
      schedule.type === attendance.filter.type &&
      schedule.whom === attendance.filter.group
  ).day;

  const dates = getDatesForSchedules(day);

  return (
    <StyledTable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Student</Table.HeaderCell>
          {dates.map(date => (
            <Table.HeaderCell key={date.day}>{date.day}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.attendance.students
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          })
          .map(student => (
            <StudentRow key={student._id} {...student} dates={dates} />
          ))}
      </Table.Body>
    </StyledTable>
  );
};

const StyledTable = styled(Table)`
	display: table;
`;

export default AttendanceTable;
