import React from 'react';
import { connect } from 'react-redux';

import Overview from './Overview';

const OverviewContainer = props => <Overview {...props} />;

const mapStateToProps = state => ({
  user: state.account.auth.user,
  courses: state.account.auth.user.profile.group.courses,
  lang: state.account.auth.user.profile.group.lang
});

export default connect(mapStateToProps)(OverviewContainer);
