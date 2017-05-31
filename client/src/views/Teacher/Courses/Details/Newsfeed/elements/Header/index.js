import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import Header from './Header';
import { withToggle } from '../../../../../../../components/hocs';
import * as courseActions from '../../../../../../../redux/courses';

const HeaderContainer = props => <Header {...props} />;

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
