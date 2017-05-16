import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import * as metadatacourseActions
  from '../../../../../../../redux/metadatacourse';

import NewMaterial from './NewMaterial';

class NewMaterialContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    const { link, description, type } = values;
    const { lang, course: { _id } } = this.props.selectedCourse;

    this.props.addMaterial(_id, lang, type, link, description);
    this.props.reset();
  }

  render() {
    return <NewMaterial {...this.props} onSubmit={this.handleFormSubmit} />;
  }
}

const mapStateToProps = (state, props) => ({
  selectedCourse: state.courses.selectedCourse,
  initialValues: {
    type: props.type
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'newMaterialForm'
  })
);

export default enhance(NewMaterialContainer);
