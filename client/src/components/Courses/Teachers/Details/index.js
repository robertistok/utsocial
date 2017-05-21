import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Details from './Details';
import * as courseActions from '../../../../redux/courses';
import * as metadatacoursections from '../../../../redux/metadatacourse';

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
    const { selectedCourse: { lang, course: { _id: courseID } } } = this.props;

    if (lang === undefined && courseID === undefined) {
      return null;
    }

    return <Details {...this.props} />;
  }
}

const { func, shape, string } = React.PropTypes;
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

const mapStateToProps = state => ({
  courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  attendance: state.attendance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions, ...metadatacoursections }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
