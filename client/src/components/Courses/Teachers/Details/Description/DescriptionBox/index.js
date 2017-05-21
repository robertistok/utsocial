import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import DescriptionBox from './DescriptionBox';
import * as metadatacourseActions
  from '.././../../../../../redux/metadatacourse';
import { withToggle } from '../../../../../hocs';

class DescriptionBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { content: this.props.description.text };

    this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.description.text !== '') {
      this.setState({ content: nextProps.description.text });
    }
  }

  handleTextBoxChange(e) {
    this.state = { content: e.target.innerText.trim() };
  }

  handleSave() {
    const {
      selectedCourse: { course: { _id: courseID }, lang },
      loggedInUser: { profile: { _id: teacherID, name } },
      description: { text },
      toggle: hideEdit
    } = this.props;
    const { content } = this.state;

    hideEdit();

    if (text !== content) {
      this.props.updateDescription(courseID, lang, teacherID, content, name);
    }
  }

  resetState() {
    this.setState({ content: this.props.description.text });
  }

  render() {
    const { content } = this.state;

    return (
      <DescriptionBox
        {...this.props}
        handleSave={this.handleSave}
        resetState={this.resetState}
        handleTextBoxChange={this.handleTextBoxChange}
        content={content}
      />
    );
  }
}

const { string, func, shape } = React.PropTypes;
DescriptionBoxContainer.propTypes = {
  loggedInUser: shape({
    type: string.isRequired,
    profile: shape({
      _id: string.isRequired,
      name: string.isRequired
    }).isRequired
  }).isRequired,
  toggle: func.isRequired,
  description: shape({
    lastUpdatedBy: shape({
      name: string.isRequired
    }),
    text: string.isRequired,
    updatedOn: string
  }).isRequired,
  updateDescription: func.isRequired,
  selectedCourse: shape({
    course: shape({
      _id: string.isRequired
    }).isRequired,
    lang: string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
  selectedCourse: state.courses.selectedCourse,
  description: state.metadatacourse.description
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(DescriptionBoxContainer);
