import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as metadatacourseActions
  from '../../../../../../../redux/metadatacourse';

import MaterialForm from '../MaterialForm';

class NewMaterialContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    const { link, description, type } = values;
    const { lang, course: { _id } } = this.props.selectedCourse;

    this.props.addMaterial(_id, lang, type, link, description);
  }

  render() {
    const { type } = this.props;
    return (
      <MaterialForm
        {...this.props}
        submitForm={this.handleFormSubmit}
        positiveButton="Submit"
        negativeButton="Reset"
        form={`${type}new`}
        newMaterial
      />
    );
  }
}

const { string, func, shape } = React.PropTypes;
NewMaterialContainer.propTypes = {
  addMaterial: func.isRequired,
  selectedCourse: shape({
    lang: string.isRequired,
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired,
  type: string.isRequired
};

const mapStateToProps = (state, props) => ({
  selectedCourse: state.courses.selectedCourse,
  loggedInUser: state.auth.user,
  initialValues: {
    type: props.type
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  NewMaterialContainer
);
