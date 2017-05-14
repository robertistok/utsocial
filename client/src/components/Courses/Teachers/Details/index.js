import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Details from './Details';
import * as courseActions from '../../../../redux/courses';

class DetailsContainer extends Component {
  componentWillUnmount() {
    this.props.resetCourses();
  }
  render() {
    return <Details {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
