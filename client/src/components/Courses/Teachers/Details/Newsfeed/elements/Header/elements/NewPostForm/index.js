import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import * as courseActions from '../../../../../../../../../redux/courses';
import NewPostForm from './NewPostForm';

class NewPostFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const {
      addPost,
      selectedCourse: { lang, groups: all, course: { _id: courseID } },
      loggedInUser: { _id: teacherID }
    } = this.props;
    const { content, relatedTo, includeTeachers, targetGroups } = values;

    const newPost = {
      content,
      postedBy: teacherID,
      target: {
        course: { id: courseID, relatedTo, lang },
        includeTeachers,
        groups: targetGroups === 'all' ? [...all] : [targetGroups]
      }
    };

    addPost(newPost);
  }

  render() {
    return <NewPostForm {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const { func, string, number, shape, arrayOf } = React.PropTypes;
NewPostFormContainer.propTypes = {
  addPost: func.isRequired,
  selectedCourse: shape({
    lang: string.isRequired,
    groups: arrayOf(
      shape({
        id: number.isRequired,
        _id: string.isRequired
      }).isRequired
    ).isRequired,
    course: shape({ _id: string.isRequired }).isRequired
  }).isRequired,
  loggedInUser: shape({ _id: string.isRequired }).isRequired
};

const mapStateToProps = state => ({
  selectedCourseGroups: state.courses.selectedCourse.groups,
  selectedCourseTeachingTypes: state.courses.selectedCourse.course.teachingTypes,
  selectedCourse: state.courses.selectedCourse,
  loggedInUser: state.auth.user,
  initialValues: {
    includeTeachers: 'true',
    relatedTo: 'general',
    targetGroups: 'all'
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'newPostForm' })
);

export default enhance(NewPostFormContainer);
