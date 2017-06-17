import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import enhanceWithClickOutside from 'react-click-outside';

import { withToggle } from '../../../../../../../components/hocs';
import * as metadatacourseActions
  from '../../../../../../../redux/metadatacourse';

import MaterialCard from './MaterialCard';

class MaterialCardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { showButtons: false };

    this.handleCardEdit = this.handleCardEdit.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);
    this.toggleActionButtons = this.toggleActionButtons.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.material !== this.props.material ||
      nextProps.toggledOn !== this.props.toggledOn ||
      nextState.showButtons !== this.state.showButtons;
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

  handleClickOutside() {
    const { toggledOn: editing, toggle } = this.props;

    if (editing === true) {
      toggle();
    }
  }

  toggleActionButtons() {
    this.setState(state => ({ showButtons: !state.showButtons }));
  }

  render() {
    return (
      <MaterialCard
        {...this.props}
        handleCardEdit={this.handleCardEdit}
        handleCardDelete={this.handleCardDelete}
        toggleActionButtons={this.toggleActionButtons}
        showButtons={this.state.showButtons}
      />
    );
  }
}

const { func, shape, string, bool } = PropTypes;
MaterialCardContainer.propTypes = {
  updateMaterial: func.isRequired,
  deleteMaterial: func.isRequired,
  toggledOn: bool.isRequired,
  material: shape({
    _id: string.isRequired,
    link: string.isRequired,
    description: string.isRequired,
    enteredOn: string.isRequired
  }).isRequired,
  selectedCourse: shape({
    lang: string.isRequired,
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired,
  toggle: func.isRequired
};

const mapStateToProps = (state, props) => ({
  selectedCourse: state.courses.selectedCourse,
  loggedInUser: state.account.auth.user,
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
  connect(mapStateToProps, mapDispatchToprops),
  enhanceWithClickOutside
);

export default enhance(MaterialCardContainer);
