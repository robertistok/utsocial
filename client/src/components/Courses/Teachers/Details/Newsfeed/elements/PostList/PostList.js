import React, { PropTypes } from 'react';

const PostList = (props) => {
  const { newsFeed } = props;

  return (
    <div>
      {newsFeed.map(item => <div key={item._id}>{item.content}</div>)}
    </div>
  );
};

export default PostList;
