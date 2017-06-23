import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gradesActions from '../../../../../../../redux/grades';

import GradesTable from './GradesTable';

const GradesTableContainer = (props) => {
  const { selectedGroup } = props;
  if (selectedGroup === undefined) {
    return null;
  }

  return <GradesTable {...props} />;
};

const { string } = PropTypes;
GradesTableContainer.propTypes = {
  selectedGroup: string
};

const mapStateToProps = (state) => {
  const { selectedCourse: { course } } = state.courses;
  const types = [
    ...Object.keys(course.teachingTypes).filter(
      type => course.teachingTypes[type] === true
    ),
    'final'
  ];

  return {
    selectedGroup: state.grades.selectedGroup,
    students: state.grades.students,
    gradesList: state.grades.gradesList,
    numberOfGrades: state.grades.numberOfGrades,
    selectedCourse: state.courses.selectedCourse,
    loggedInTeacher: state.account.auth.user,
    types
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  GradesTableContainer
);
