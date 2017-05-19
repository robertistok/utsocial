import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostList from './PostList';

class PostListContainer extends Component {
  render() {
    return <PostList {...this.props} />;
  }
}

export default PostListContainer;
