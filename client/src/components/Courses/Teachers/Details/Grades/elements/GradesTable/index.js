import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gradesActions from '../../../../../../../redux/grades';

import GradesTable from './GradesTable';

class GradesTableContainer extends Component {
  render() {
    if (this.props.selectedGroup === undefined) {
      return null;
    }

    return <GradesTable {...this.props} />;
  }
}

const mapStateToProps = state => ({
  selectedGroup: state.grades.selectedGroup,
  students: state.grades.students,
  gradesList: state.grades.gradesList,
  numberOfGrades: state.grades.numberOfGrades,
  selectedCourse: state.courses.selectedCourse,
  loggedInTeacher: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  GradesTableContainer
);
