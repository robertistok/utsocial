import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../../../../../../redux/courses';

import PostList from '../../../../../../../components/Newsfeed/PostList';

const PostListContainer = props => <PostList {...props} />;

const mapStateToProps = state => ({
  newsFeed: courseActions.postList(state),
  loggedInUser: state.account.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...courseActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
