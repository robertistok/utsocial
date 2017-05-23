import React from 'react';
import styled from 'styled-components';

import Post from './Post';
import { media } from '../../utils/style-utils';
import { MODALS } from '../../constants';

const PostList = (props) => {
  const {
    newsFeed,
    loggedInUser: { _id: userID },
    deletePost,
    showModal,
    updateFunction,
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
            deletePost={
              isOwner
							? () =>
							showModal(MODALS.CONFIRM_ACTION, {
								confirmAction: () => deletePost(postID),
                      content: 'Are you sure you want to delete this post?'
							})
                : undefined
            }
            updatePost={isOwner && updateFunction(postID)}
            isNew={!seenBy.includes(userID)}
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

const { shape, string, func, arrayOf, bool } = React.PropTypes;
PostList.propTypes = {
  mark: func.isRequired,
  unMark: func.isRequired,
  deletePost: func.isRequired,
  showModal: func,
  updateFunction: func,
  newsFeed: arrayOf(
    shape({
      created: string.isRequired,
      edited: string,
      content: string.isRequired,
      postedBy: shape({
        _id: string.isRequired,
        name: string.isRequired
      }).isRequired,
      target: shape({
        course: shape({
          id: string.isRequired,
          lang: string.isRequired,
          relatedTo: string.isRequired
        }).isRequired,
        groups: arrayOf(string).isRequired,
        includeTeachers: bool.isRequired
      }).isRequired,
      seenBy: arrayOf(string).isRequired,
      marked: arrayOf(string).isRequired
    }).isRequired
  ).isRequired,
  loggedInUser: shape({ _id: string.isRequired })
};

const Wrapper = styled.div`
	width: 50%;
	margin: 30px 0px;

	${media.tablet`
		width: 70%;
		`}

	${media.phone`
		font-size: 12px;
		width: 90%;
		`}
`;

const NoPostMessage = styled.span`
	display: inline-block;
	font-weight: lighter;
	font-size: 18px;
	text-align: center;
	width: 100%;
`;

export default PostList;
