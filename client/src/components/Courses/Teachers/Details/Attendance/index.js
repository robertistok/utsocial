import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Attendance from './Attendance';
import * as attendanceActions from '../../../../../redux/attendance';
import { withToggle } from '../../../../hocs';

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
  attendance: state.attendance,
  filter: state.attendance.filter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...attendanceActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(AttendanceContainer);
