import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Grades from './Grades';
import * as gradesActions from '../../../../../redux/grades';
import { withToggle } from '../../../../../components/hocs';

class GradesContainer extends Component {
  componentDidMount() {
    const { course: { _id: selectedCourseID } } = this.props.selectedCourse;
    const {
      _id: studentID
    } = this.props.loggedInUser;

    this.props.fetchGradesStudents(studentID, {
      [selectedCourseID]: selectedCourseID
    });
  }

  render() {
    return <Grades {...this.props} />;
  }
}

const { func, shape, string } = PropTypes;
GradesContainer.propTypes = {
  fetchGradesStudents: func.isRequired,
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
  gradesList: state.grades.gradesList
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(GradesContainer);
