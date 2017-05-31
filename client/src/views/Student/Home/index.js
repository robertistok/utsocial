import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as coursesActions from '../../../redux/courses';
import StudentsHome from './StudentsHome';

class StudentsHomeContainer extends Component {
  componentDidMount() {
    const {
      loggedInUser: { profile: { group: { _id: studentGroupID } } },
      getFeedForStudent
    } = this.props;

    if (sessionStorage.getItem('token') !== null) {
      getFeedForStudent(studentGroupID);
    }
  }

  // load data only if token is present

  render() {
    return <StudentsHome {...this.props} />;
  }
}

const { shape, func, string } = React.PropTypes;
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
