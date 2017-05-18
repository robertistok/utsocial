import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Details from './Details';
import * as courseActions from '../../../../redux/courses';
import * as metadatacoursections from '../../../../redux/metadatacourse';

class DetailsContainer extends Component {
  componentDidMount() {
    const { match: { params: { id, lang } } } = this.props;
    this.props.getMetaData(id, lang);
  }

  componentWillUnmount() {
    this.props.resetCourses();
    this.props.resetMetadataCourse();
  }

  render() {
    const { selectedCourse } = this.props;

    if (
      selectedCourse.lang === undefined &&
      selectedCourse.course._id === undefined
    ) {
      return null;
    }

    return <Details {...this.props} />;
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions, ...metadatacoursections }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
