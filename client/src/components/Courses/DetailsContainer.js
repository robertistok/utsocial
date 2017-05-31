import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../redux/courses';
import * as metadatacoursections from '../../redux/metadatacourse';

function withSelectedCourse(DetailsComponent) {
  class DetailsContainer extends Component {
    componentDidMount() {
      const { match: { params: { id, lang } } } = this.props;
      this.props.selectCourse(id, lang);
      this.props.getMetaData(id, lang);
    }

    componentWillUnmount() {
      this.props.resetCourses();
      this.props.resetMetadataCourse();
    }

    render() {
      const {
        selectedCourse: { lang, course: { _id: courseID } }
      } = this.props;

      if (lang === undefined && courseID === undefined) {
        return null;
      }

      return <DetailsComponent {...this.props} />;
    }
  }

  const { func, shape, string } = PropTypes;
  DetailsContainer.propTypes = {
    selectCourse: func.isRequired,
    getMetaData: func.isRequired,
    resetCourses: func.isRequired,
    resetMetadataCourse: func.isRequired,
    match: shape({
      params: shape({
        id: string.isRequired,
        lang: string.isRequired
      }).isRequired
    }).isRequired,
    selectedCourse: shape({
      lang: string,
      course: shape({ _id: string })
    })
  };

  function mapStateToProps(state) {
    return {
      courses: state.courses,
      selectedCourse: state.courses.selectedCourse,
      attendance: state.attendance
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { ...courseActions, ...metadatacoursections },
      dispatch
    );
  }

  return connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
}

export default withSelectedCourse;
