import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as coursesActions from '../../../redux/courses';
import StudentsHome from './StudentsHome';

class StudentsHomeContainer extends Component {
  componentDidMount() {
    const {
      loggedInUser: { profile: { group: { _id: studentGroupID } } },
      getFeedForStudent
    } = this.props;

    if (sessionStorage.getItem('token') !== null) {
      getFeedForStudent(studentGroupID);
    }
  }

  // load data only if token is present

  render() {
    return <StudentsHome {...this.props} />;
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
  newsFeed: state.courses.newsFeed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...coursesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  StudentsHomeContainer
);
