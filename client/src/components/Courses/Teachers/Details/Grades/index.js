import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grades from './Grades';
import * as gradesActions from '../../../../../redux/grades';

class GradesContainer extends Component {
  render() {
    return <Grades {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  selectedGroup: state.grades.selectedGroup
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...gradesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToprops)(GradesContainer);
