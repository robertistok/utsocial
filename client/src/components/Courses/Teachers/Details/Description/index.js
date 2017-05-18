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

    this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillMount() {
    this.state = { textAreaValue: this.props.description.text };
  }

  handleTextBoxChange(e) {
    this.setState({ textAreaValue: e.target.value });
  }

  handleSave() {
    const {
      selectedCourse: { course: { _id: courseID }, lang },
      loggedInUser: { profile: { _id: teacherID, name } }
    } = this.props;
    const { textAreaValue } = this.state;

    this.props.updateDescription(
      courseID,
      lang,
      teacherID,
      textAreaValue,
      name
    );
  }

  resetState() {
    this.setState({ textAreaValue: this.props.description.text });
  }

  render() {
    const { toggle, toggledOn, loggedInUser, description } = this.props;
    const { textAreaValue = description.text } = this.state;

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

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
  // courses: state.courses,
  selectedCourse: state.courses.selectedCourse,
  // selectedGroup: state.grades.selectedGroup,
  description: state.metadatacourse.description
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(DescriptionContainer);
