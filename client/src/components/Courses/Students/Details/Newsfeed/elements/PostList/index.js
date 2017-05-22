import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../../../../../../redux/courses';
import * as modalsActions from '../../../../../../../redux/modals';

import PostList from '../../../../../elements/Newsfeed/PostList';

const PostListContainer = props => <PostList {...props} />;

const mapStateToProps = state => ({
  newsFeed: courseActions.postList(state),
  loggedInUser: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions, ...modalsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
