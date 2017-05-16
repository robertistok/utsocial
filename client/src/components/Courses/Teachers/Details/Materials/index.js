import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Materials from './Materials';
import * as metadatacourseActions from '../../../../../redux/metadatacourse';
import { withToggle } from '../../../../hocs';

class MaterialsContainer extends Component {
  constructor(props) {
    super(props);

    this.handleNewMaterialSubmit = this.handleNewMaterialSubmit.bind(this);
  }

  componentDidMount() {
    const { lang, course: { _id } } = this.props.selectedCourse;

    this.props.getMetaData(_id, lang);
  }

  componentWillUnmount() {
    this.props.resetMetadataCourse();
  }

  handleNewMaterialSubmit(values) {
    const { link, description, type } = values;
    const { lang, course: { _id } } = this.props.selectedCourse;

    this.props.addMaterial(_id, lang, type, link, description);
  }

  render() {
    return (
      <Materials
        {...this.props}
        handleNewMaterialSubmit={this.handleNewMaterialSubmit}
      />
    );
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
