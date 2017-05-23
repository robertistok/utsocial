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

    getFeedForStudent(studentGroupID);
  }

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
