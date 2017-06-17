import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as coursesActions from '../../../redux/courses';
import StudentsHome from './StudentsHome';
import { getToken } from '../../../utils/sessionOperations';

class StudentsHomeContainer extends Component {
  componentDidMount() {
    const {
      loggedInUser: { profile: { group: { _id: studentGroupID } } },
      getFeedForStudent
    } = this.props;

    if (getToken() !== null) {
      getFeedForStudent(studentGroupID);
    }
  }

  render() {
    return <StudentsHome {...this.props} />;
  }
}

const { shape, func, string } = PropTypes;
StudentsHomeContainer.propTypes = {
  getFeedForStudent: func.isRequired,
  loggedInUser: shape({
    profile: shape({
      group: shape({ _id: string.isRequired }).isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.account.auth.user,
  newsFeed: state.courses.newsFeed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...coursesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  StudentsHomeContainer
);
