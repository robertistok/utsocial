import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AttendanceTable from './AttendanceTable';
import * as attendanceActions from '../../../../../../../redux/attendance';
import { getDatesForSchedules } from '../../../../../../../utils/date';

class AttendanceTableContainer extends Component {
  render() {
    const {
      attendance: { filter: { type } },
      selectedCourse
    } = this.props;

    if (type === undefined) return null;

    const day = selectedCourse.schedules.find(
      schedule => schedule.type === type
    ).day;

    const dates = getDatesForSchedules(day);

    return <AttendanceTable {...this.props} dates={dates} />;
  }
}

const { string, shape } = React.PropTypes;
AttendanceTableContainer.propTypes = {
  selectedCourse: shape({
    course: shape({
      _id: string.isRequired
    })
  }).isRequired,
  attendance: shape({
    filter: shape({
      type: string,
      group: string
    }).isRequired
  }).isRequired
};

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
