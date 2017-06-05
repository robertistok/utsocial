import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gradesActions from '../../../../redux/grades';
import Table from './Table';

class TableContainer extends Component {
  componentDidMount() {
    const {
      coursesByYear,
      student: { _id: studentID },
      fetchGradesStudents
    } = this.props;
    fetchGradesStudents(studentID, coursesByYear);
  }
  render() {
    return <Table {...this.props} />;
  }
}

const { func, shape, string, objectOf, bool, number } = PropTypes;
TableContainer.propTypes = {
  fetchGradesStudents: func.isRequired,
  student: shape({ _id: string.isRequired }).isRequired,
  coursesByYear: objectOf(
    shape({
      _id: string.isRequired,
      credits: number.isRequired,
      name: string.isRequired,
      semester: number.isRequired,
      teachingTypes: shape({
        lab: bool,
        lecture: bool,
        seminar: bool,
        project: bool
      }).isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = (state) => {
  const { filter: { semester } } = state.grades;

  const coursesByYear = gradesActions.filterCoursesByYear(state);

  const semesterToReducer = semester === 'both' ? [1, 2] : [semester];
  const visibleCourses = Object.keys(coursesByYear).reduce(
    (acc, key) =>
      semesterToReducer.includes(coursesByYear[key].semester)
        ? {
            ...acc,
            [coursesByYear[key].semester]: {
              ...acc[coursesByYear[key].semester],
              [key]: { ...coursesByYear[key] }
            }
          }
        : { ...acc },
    {}
  );

  return {
    gradesList: state.grades.gradesList,
    coursesByYear,
    visibleCourses,
    student: state.account.auth.user,
    semester: state.grades.filter.semester
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
