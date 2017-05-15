import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Materials from './Materials';
import * as materialsActions from '../../../../../redux/materials';
import { withToggle } from '../../../../hocs';

class MaterialsContainer extends Component {
  componentWillUnmount() {
    // this.props.resetGrades();
  }

  render() {
    return <Materials {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedGroup: state.grades.selectedGroup,
  materials: state.materials
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...materialsActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(MaterialsContainer);
