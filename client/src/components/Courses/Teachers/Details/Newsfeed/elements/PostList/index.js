import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostList from './PostList';

class PostListContainer extends Component {
  render() {
    return <PostList {...this.props} />;
  }
}

const mapStateToProps = state => ({
  newsFeed: state.courses.selectedCourse.newsFeed,
  loggedInUser: state.auth.user
});

export default connect(mapStateToProps)(PostListContainer);
