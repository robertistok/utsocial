import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Newsfeed from './Newsfeed';
import { withToggle } from '../../../../hocs';
import * as courseActions from '../../../../../redux/courses';

class NewsfeedContainer extends Component {
  componentDidMount() {
    const { lang, course: { _id: courseID } } = this.props.selectedCourse;
    const { _id: teacherID } = this.props.loggedInUser;

    const query = { teacherID, target: { courseID, lang } };
    this.props.getFeedForCourse(query);
  }

  render() {
    return <Newsfeed {...this.props} />;
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
  selectedCourse: state.courses.selectedCourse,
  description: state.metadatacourse.description
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(NewsfeedContainer);
