import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Accordion } from 'semantic-ui-react';

import Description from './Description';
import * as metadatacourseActions from '../../../../../redux/metadatacourse';
import { withToggle } from '../../../../hocs';
import { StyledAccordionTitle } from '../elements/styled';

class DescriptionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { textAreaValue: this.props.description.text };

    this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.description.text !== '') {
      this.setState({ textAreaValue: nextProps.description.text });
    }
  }

  handleTextBoxChange(e) {
    this.setState({ textAreaValue: e.target.value });
  }

  handleSave() {
    const {
      selectedCourse: { course: { _id: courseID }, lang },
      loggedInUser: { profile: { _id: teacherID, name } },
      description: { text }
    } = this.props;
    const { textAreaValue } = this.state;

    if (text !== textAreaValue) {
      this.props.updateDescription(
        courseID,
        lang,
        teacherID,
        textAreaValue,
        name
      );
    }
  }

  resetState() {
    this.setState({ textAreaValue: this.props.description.text });
  }

  render() {
    const { toggle, toggledOn, loggedInUser, description } = this.props;
    const { textAreaValue } = this.state;

    const isTeacher = loggedInUser.type === 'teacher';

    return (
      <div>
        <StyledAccordionTitle
          onClick={toggle}
          active={toggledOn}
          content="Description"
        />

        {toggledOn &&
          <Accordion.Content active>
            <Description
              isTeacher={isTeacher}
              description={description}
              textAreaValue={textAreaValue}
              handleTextBoxChange={this.handleTextBoxChange}
              handleSave={this.handleSave}
              resetState={this.resetState}
            />
          </Accordion.Content>}
      </div>
    );
  }
}

const { string, bool, func, shape } = React.PropTypes;
DescriptionContainer.propTypes = {
  loggedInUser: shape({
    type: string.isRequired,
    profile: shape({
      _id: string.isRequired,
      name: string.isRequired
    }).isRequired
  }).isRequired,
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
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

export default enhance(DescriptionContainer);
