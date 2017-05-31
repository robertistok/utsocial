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
      loggedInTeacher: { _id: assignor },
      markAsPresent,
      selectedCourse: { course: { _id: courseID } }
    } = this.props;

    markAsPresent({
      student: studentID,
      date,
      course: courseID,
      type,
      group,
      assignor
    });
  }
  render() {
    const {
      attendance: { filter: { type, group } },
      selectedCourse
    } = this.props;

    if (type === undefined || group === undefined) return null;

    const day = selectedCourse.schedules.find(
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

const { string, shape, func, oneOf } = React.PropTypes;
AttendanceTableContainer.propTypes = {
  markAsPresent: func.isRequired,
  selectedCourse: shape({
    course: shape({
      _id: string.isRequired
    })
  }).isRequired,
  loggedInTeacher: shape({
    _id: string.isRequired,
    username: string.isRequired,
    type: oneOf[('teacher', 'student', 'admin')]
  }).isRequired,
  attendance: shape({
    filter: shape({
      type: string,
      group: string
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  loggedInTeacher: state.account.auth.user,
  selectedCourse: state.courses.selectedCourse,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...attendanceActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendanceTableContainer
);
