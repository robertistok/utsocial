import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../../../../../../redux/courses';

import PostList from './PostList';

class PostListContainer extends Component {
  render() {
    return <PostList {...this.props} />;
  }
}

const mapStateToProps = state => ({
  newsFeed: courseActions.postList(state),
  loggedInUser: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
