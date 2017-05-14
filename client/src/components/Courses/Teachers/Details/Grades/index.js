import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Grades from './Grades';
import * as gradesActions from '../../../../../redux/grades';
import { withToggle } from '../../../../hocs';

class GradesContainer extends Component {
  render() {
    return <Grades {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedGroup: state.grades.selectedGroup
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(GradesContainer);
