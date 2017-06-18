import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Overview from './Overview';
import * as courseActions from '../../../../redux/courses';

const OverviewContainer = props => <Overview {...props} />;

const mapStateToProps = state => ({
  user: state.account.auth.user,
  courses: state.teachers.courses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
