import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import Newsfeed from './Newsfeed';
import { withToggle } from '../../../../hocs';

class NewsfeedContainer extends Component {
  render() {
    return <Newsfeed {...this.props} />;
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
  selectedCourse: state.courses.selectedCourse,
  description: state.metadatacourse.description
});

const mapDispatchToprops = dispatch => bindActionCreators({}, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(NewsfeedContainer);
