import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Overview from './Overview';
import * as teachersActions from '../../../../redux/teachers';
import * as courseActions from '../../../../redux/courses';

class OverviewContainer extends Component {
  componentDidMount() {
    const { fetchTeachingOfTeacher, user: { _id: userID } } = this.props;
    fetchTeachingOfTeacher(userID);
  }
  render() {
    return <Overview {...this.props} />;
  }
}

const { shape, string, func } = React.PropTypes;
OverviewContainer.propTypes = {
  fetchTeachingOfTeacher: func.isRequired,
  user: shape({ _id: string.isRequired }).isRequired
};

const mapStateToProps = state => ({
  user: state.account.auth.user,
  courses: state.teachers.courses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...teachersActions, ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
