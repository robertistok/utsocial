import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';

import NewPostForm from './NewPostForm';

class NewPostFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return <NewPostForm {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  selectedCourseGroups: state.courses.selectedCourse.groups,
  selectedCourseTeachingTypes: state.courses.selectedCourse.course.teachingTypes,
  initialValues: {
    includeTeachers: 'true',
    relatedTo: 'general',
    targetGroups: 'all'
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({ form: 'newPostForm' })
);

export default enhance(NewPostFormContainer);
