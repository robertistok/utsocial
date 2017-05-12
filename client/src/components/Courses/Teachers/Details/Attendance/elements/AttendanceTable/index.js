import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AttendanceTable from './AttendanceTable';
import * as attendanceActions from '../../../../../../../redux/attendance';
import { getDatesForSchedules } from '../../../../../../../utils/date';

class AttendanceTableContainer extends Component {
  constructor(props) {
    super(props);

    this.addAttendance = this.addAttendance.bind(this);
  }

  addAttendance(studentID, date) {
    const {
      attendance: { filter: { type, group } },
      loggedInTeacher,
      markAsPresent,
      selectedCourse
    } = this.props;

    markAsPresent({
      student: studentID,
      date,
      course: selectedCourse.course._id,
      type,
      group,
      assignor: loggedInTeacher._id
    });
  }
  render() {
    const { attendance: { filter: { type, group } } } = this.props;

    if (type === undefined || group === undefined) return null;

    const day = this.props.selectedCourse.schedules.find(
      schedule => schedule.type === type && schedule.whom === group
    ).day;

    const dates = getDatesForSchedules(day);

    return (
      <AttendanceTable
        {...this.props}
        addAttendance={this.addAttendance}
        dates={dates}
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedInTeacher: state.auth.user,
  selectedCourse: state.courses.selectedCourse,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...attendanceActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendanceTableContainer
);
