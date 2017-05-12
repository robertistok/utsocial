import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  selectedCourse: state.courses.selectedCourse
});

export default connect(mapStateToProps)(GradesTableContainer);
