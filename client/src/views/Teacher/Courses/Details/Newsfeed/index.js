import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Newsfeed from './Newsfeed';
import { withToggle } from '../../../../../components/hocs';
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

const { func, shape, string } = PropTypes;
NewsfeedContainer.propTypes = {
  getFeedForCourse: func.isRequired,
  selectedCourse: shape({
    lang: string.isRequired,
    course: shape({
      _id: string.isRequired
    }).isRequired
  }).isRequired,
  loggedInUser: shape({
    _id: string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.account.auth.user,
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
