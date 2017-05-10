import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Attendance from './Attendance';
import * as attendanceActions from '../../../../../redux/attendance';

class AttendanceContainer extends Component {
  componentWillUnmount() {
    this.props.resetAttendance();
  }

  render() {
    return <Attendance {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...attendanceActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendanceContainer
);