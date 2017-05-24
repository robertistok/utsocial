import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Grades from './Grades';
import * as gradesActions from '../../../../../redux/grades';
import { withToggle } from '../../../../../components/hocs';

class GradesContainer extends Component {
  componentWillUnmount() {
    this.props.resetGrades();
  }

  render() {
    return <Grades {...this.props} />;
  }
}

const { func } = React.PropTypes;
GradesContainer.propTypes = {
  resetGrades: func.isRequired
};

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
