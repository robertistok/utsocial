import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import AttendanceItem from './AttendanceItem';

class StudentRow extends Component {
  static todayIsBefore(date) {
    return moment(date, 'DD/MM').isBefore(moment());
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.attendanceList.length !== this.props.attendanceList.length;
  }

  render() {
    const {
      name,
      index,
      dates,
      _id,
      addAttendance,
      removeAttendance,
      attendanceList
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        {dates.map((date) => {
          const attendance = attendanceList.find(attendance =>
            moment(attendance.enteredFor).isSame(
              moment(date.day, 'DD/MM'),
              'day'
            ));

          const isBeforeToday = StudentRow.todayIsBefore(date.day);

          return (
            <AttendanceItem
              key={_id + date.day}
              studentID={_id}
              isBeforeToday={isBeforeToday}
              hasAttendance={attendance !== undefined}
              onClick={() =>
                attendance === undefined
                  ? addAttendance(_id, date.day)
                  : removeAttendance(attendance._id)}
            />
          );
        })}
        <Table.Cell textAlign="center">{attendanceList.length}</Table.Cell>
      </Table.Row>
    );
  }
}

const { string, number, shape, arrayOf, func } = React.PropTypes;
StudentRow.propTypes = {
  name: string.isRequired,
  index: number.isRequired,
  dates: arrayOf(
    shape({
      day: string.isRequired
    })
  ).isRequired,
  _id: string.isRequired,
  addAttendance: func.isRequired,
  removeAttendance: func.isRequired,
  attendanceList: arrayOf(
    shape({
      enteredFor: string.isRequired,
      _id: string.isRequired
    })
  )
};

export default StudentRow;
