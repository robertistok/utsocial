import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Post from './elements/Post';

const PostList = (props) => {
  const { newsFeed, loggedInUser: { _id: teacherID } } = props;

  return (
    <Wrapper>
      {newsFeed.map(item => (
        <Post
          key={item._id}
          {...item}
          editable={teacherID === item.postedBy._id}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`

`;

export default PostList;
