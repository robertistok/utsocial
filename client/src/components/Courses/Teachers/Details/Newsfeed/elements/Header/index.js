import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import Header from './Header';
import { withToggle } from '../../../../../../hocs';
import * as courseActions from '../../../../../../../redux/courses';

class HeaderContainer extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => ({
  selectedCourseTeachingTypes: state.courses.selectedCourse.course.teachingTypes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(HeaderContainer);
