import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../../../../../utils/timestamp';
import {
  capitalizeFirstLetter
} from '../../../../../../../../utils/string-operations';
import SettingsGroup from './SettingsGroup';

const Post = (props) => {
  const {
    _id: postID,
    content,
    edited,
    created,
    postedBy,
    isOwner,
    target,
    deletePost,
    markSeen,
    unMarkSeen,
    markImportant,
    unMarkImportant
  } = props;

  let options = [];

  if (deletePost !== undefined) {
    options = [
      ...options,
      { key: 'edit', icon: 'edit', text: 'Edit' },
      {
        key: 'delete',
        icon: 'delete',
        text: 'Remove',
        onClick: () => deletePost(postID)
      }
    ];
  }

  if (!isOwner) {
    if (unMarkSeen !== undefined) {
      options = [
        ...options,
        {
          key: 'hide',
          icon: 'hide',
          text: 'Mark as unseen',
          onClick: unMarkSeen
        }
      ];
    } else {
      options = [
        ...options,
        {
          key: 'unhide',
          icon: 'unhide',
          text: 'Mark as seen',
          onClick: markSeen
        }
      ];
    }
  }

  if (markImportant !== undefined) {
    options = [
      ...options,
      {
        key: 'sticky note outline',
        icon: 'sticky note outline',
        text: 'Mark as important',
        onClick: markImportant
      }
    ];
  } else {
    options = [
      ...options,
      {
        key: 'sticky note',
        icon: 'sticky note',
        text: 'Mark as not important',
        onClick: unMarkImportant
      }
    ];
  }

  return (
    <Wrapper>
      <Header>
        {!isOwner && markSeen !== undefined && <span>New</span>}
        <SettingsGroup options={options} />
        <Author>{postedBy.name}</Author>
        <RelatedTo>
          {capitalizeFirstLetter(target.course.relatedTo)}
        </RelatedTo>
        <Timestamp>@{formatTime(created)}</Timestamp>
      </Header>
      <Content>
        {content}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background-color: #FFFFFF;
	box-shadow: 0 3px 5px rgba(0,0,0,.23)
	height: min-content;
	margin-bottom: 40px;
	width: 100%;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 10px 0px 10px;
	border-bottom: 0.2px solid rgba(0,0,0,.23);
`;

const Content = styled.div`
	height: min-content;
	padding: 10px;
`;

const Author = styled.span`
	display: inline-block;
	width: 150px;
	margin-bottom: 5px
`;

const RelatedTo = styled.span`
	display: inline-block;
	margin-bottom: 5px
`;

const Timestamp = styled.span`
	display: inline-block;
	margin-bottom: 5px;
`;

export default Post;
