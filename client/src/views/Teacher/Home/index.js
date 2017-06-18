import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as coursesActions from '../../../redux/courses';
import Home from '../../../components/Home';
import { getToken } from '../../../utils/sessionOperations';

class TeachersHomeContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.teachings.length !== this.props.teachings.length) {
      const {
        loggedInUser: { _id: teacherID },
        teachings,
        getFeedForTeacher
      } = nextProps;

      const teachingsReduced = teachings.reduce(
        (acc, item) => ({
          ...acc,
          courseIDs: [...acc.courseIDs, item._id],
          langs: [...acc.langs, item.lang]
        }),
        { courseIDs: [], langs: [] }
      );

      const { courseIDs, langs } = teachingsReduced;

      if (getToken() !== null) {
        getFeedForTeacher(teacherID, courseIDs, langs);
      }
    }
  }

  render() {
    return <Home {...this.props} />;
  }
}

const { shape, func, string, arrayOf } = PropTypes;
TeachersHomeContainer.propTypes = {
  getFeedForTeacher: func.isRequired,
  loggedInUser: shape({
    _id: string.isRequired
  }).isRequired,
  teachings: arrayOf(shape({ _id: string.isRequired, lang: string.isRequired }))
};

const mapStateToProps = state => ({
  loggedInUser: state.account.auth.user,
  newsFeed: state.courses.newsFeed,
  teachings: state.teachers.courses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...coursesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  TeachersHomeContainer
);
