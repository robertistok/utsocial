import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Overview from './Overview';
import * as teachersActions from '../../../../redux/teachers';
import * as courseActions from '../../../../redux/courses';

class OverviewContainer extends Component {
  componentDidMount() {
    this.props.fetchTeachingOfTeacher(this.props.user._id);
  }
  render() {
    return <Overview {...this.props} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  courses: state.teachers.courses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...teachersActions, ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
