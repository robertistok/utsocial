import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Overview from './Overview';

class OverviewContainer extends Component {
  render() {
    return <Overview {...this.props} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  courses: state.auth.user.profile.group.courses
});

export default connect(mapStateToProps)(OverviewContainer);
