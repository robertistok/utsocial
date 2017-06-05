import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Materials from './Materials';
import * as metadatacourseActions from '../../../../../redux/metadatacourse';
import { withToggle } from '../../../../../components/hocs';

const MaterialsContainer = props => <Materials {...props} />;

const mapStateToProps = state => ({
  loggedInUser: state.account.auth.user,
  courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedGroup: state.grades.selectedGroup,
  materials: state.metadatacourse.materials
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(MaterialsContainer);
