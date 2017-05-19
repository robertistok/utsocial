import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../../../../../utils/timestamp';
import {
  capitalizeFirstLetter
} from '../../../../../../../../utils/string-operations';

const Post = (props) => {
  const { content, edited, created, postedBy, target, editable } = props;
  return (
    <Wrapper onClick={() => editable && console.log('hello')}>
      <Header>
        <Author>By {postedBy.name}</Author>
        <RelatedTo>
          Related to: {capitalizeFirstLetter(target.course.relatedTo)}
        </RelatedTo>
        <Timestamp>@ {formatTime(created)}</Timestamp>
      </Header>
      <Content>
        {content}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	box-shadow: 0 3px 5px rgba(0,0,0,.23)
	height: min-content;
	margin-bottom: 20px;
	width: 450px;
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
	margin-bottom: 10px
`;

const RelatedTo = styled.span`
	display: inline-block;
	margin-bottom: 10px
`;

const Timestamp = styled.span`
	display: inline-block;
	margin-bottom: 10px;
`;

export default Post;
