import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Post from './elements/Post';

const PostList = (props) => {
  const {
    _id: postID,
    newsFeed,
    loggedInUser: { _id: userID },
    deletePost,
    mark,
    unMark
  } = props;

  return (
    <Wrapper>
      {newsFeed.length === 0 && <NoPostMessage>No posts yet...</NoPostMessage>}
      {newsFeed.map((item) => {
        const { _id: postID, postedBy, seenBy, marked } = item;
        const isOwner = userID === postedBy._id;

        const markFunction = type => () => mark(postID, userID, type);
        const unMarkFunction = type => () => unMark(postID, userID, type);

        return (
          <Post
            key={postID}
            {...item}
            isOwner={isOwner}
            deletePost={isOwner ? () => deletePost(postID) : undefined}
            markSeen={
              !isOwner && !seenBy.includes(userID)
                ? markFunction('seenBy')
                : undefined
            }
            unMarkSeen={
              !isOwner && seenBy.includes(userID)
                ? unMarkFunction('seenBy')
                : undefined
            }
            markImportant={
              !marked.includes(userID) ? markFunction('marked') : undefined
            }
            unMarkImportant={
              marked.includes(userID) ? unMarkFunction('marked') : undefined
            }
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
	width: 50%;
	margin: 30px 0px;
`;

const NoPostMessage = styled.span`
	display: inline-block;
	font-weight: lighter;
	font-size: 18px;
	text-align: center;
	width: 100%;
`;

export default PostList;
