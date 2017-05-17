import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withToggle } from '../../../../../../hocs';
import * as metadatacourseActions
  from '../../../../../../../redux/metadatacourse';

import MaterialCard from './MaterialCard';

class MaterialCardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { showButtons: false };

    this.handleCardEdit = this.handleCardEdit.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);
    this.showActionButtons = this.showActionButtons.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.material !== this.props.material ||
      nextProps.toggledOn !== this.props.toggledOn;
  }

  handleCardEdit(materialID) {
    const { lang, course: { _id: courseID } } = this.props.selectedCourse;

    return (values) => {
      const { link, description } = values;
      this.props.updateMaterial(materialID, courseID, lang, link, description);
      this.props.toggle();
    };
  }

  handleCardDelete(materialID) {
    const { lang, course: { _id: courseID } } = this.props.selectedCourse;

    this.props.deleteMaterial(courseID, lang, materialID);
  }

  showActionButtons() {
    this.setState({ showButtons: true });
  }

  render() {
    return (
      <MaterialCard
        {...this.props}
        handleCardEdit={this.handleCardEdit}
        handleCardDelete={this.handleCardDelete}
        showActionButtons={this.showActionButtons}
        showButtons
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  selectedCourse: state.courses.selectedCourse,
  loggedInUser: state.auth.user,
  initialValues: {
    link: props.material.link,
    description: props.material.description,
    type: props.type
  }
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(MaterialCardContainer);
