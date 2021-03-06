import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Attendance from './Attendance';
import * as attendanceActions from '../../../../../redux/attendance';
import { withToggle } from '../../../../../components/hocs';

class AttendanceContainer extends Component {
  componentWillUnmount() {
    this.props.resetAttendance();
  }

  render() {
    return <Attendance {...this.props} />;
  }
}

const { func } = PropTypes;
AttendanceContainer.propTypes = {
  resetAttendance: func.isRequired
};

const mapStateToProps = state => ({
  courses: state.courses,
  attendance: state.attendance,
  filter: state.attendance.filter,
  studentID: state.account.auth.user._id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...attendanceActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(AttendanceContainer);
