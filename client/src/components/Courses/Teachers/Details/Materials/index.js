import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Materials from './Materials';
import * as metadatacourseActions from '../../../../../redux/metadatacourse';
import { withToggle } from '../../../../hocs';

class MaterialsContainer extends Component {
  componentDidMount() {
    const { lang, course: { _id } } = this.props.selectedCourse;

    this.props.getMetaData(_id, lang);
  }

  componentWillUnmount() {
    this.props.resetMetadataCourse();
  }

  render() {
    return <Materials {...this.props} />;
  }
}

const mapStateToProps = state => ({
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
