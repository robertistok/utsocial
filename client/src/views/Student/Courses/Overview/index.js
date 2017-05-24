import React from 'react';
import { connect } from 'react-redux';

import Overview from './Overview';

const OverviewContainer = props => <Overview {...props} />;

const mapStateToProps = state => ({
  user: state.auth.user,
  courses: state.auth.user.profile.group.courses,
  lang: state.auth.user.profile.group.lang
});

export default connect(mapStateToProps)(OverviewContainer);
