import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header';
import * as courseActions from '../../../../../../../redux/courses';

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = state => ({
  selectedCourseTeachingTypes: state.courses.selectedCourse.course.teachingTypes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
