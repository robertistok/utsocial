import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Details from './Details';
import * as courseActions from '../../../../redux/courses';
import { getDatesForSchedules } from '../../../../utils/date';

class DetailsContainer extends Component {
  componentDidMount() {
    // this.props.getCourseInfo(code, _id);
  }

  componentWillUnmount() {
    this.props.resetCourses();
  }
  render() {
    return <Details {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
