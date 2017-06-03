import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchBar from './elements/SearchBar';
import Thread from '../../common/Thread';
import Header from './elements/Header';

const Inbox = (props) => {
  const {
    conversations
  } = props;

  return (
    <Wrapper>
      <Header {...props} />
      <ThreadsContainer>
        <SearchBar {...props} />
        {conversations && conversations.length !== 0
          ? conversations
              .sort(
                (c1, c2) => c1.messages[0].timestamp < c2.messages[0].timestamp
              )
              .map(conversation => (
                <Thread key={conversation._id} {...conversation} {...props} />
              ))
          : <NoMessages>No messages</NoMessages>}
      </ThreadsContainer>
    </Wrapper>
  );
};

const { shape, arrayOf, string } = PropTypes;
Inbox.propTypes = {
  conversations: arrayOf(shape({ _id: string.isRequired }))
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 1px solid rgba(0, 0, 0, .10);
	background-color: #FFFFFF;

	@media screen and (min-width: 769px) {
		height: 100%;
		flex-grow: 1;
		flex-basis: 250px;
	}
`;

const ThreadsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: auto;
	height: calc(100% - 50px);

	@media screen and (max-width: 768px) {
		overflow: auto;
		border-bottom: 1px solid ${props => props.theme.lightGray};
		width: 100%;
		height: 100%;
	}
`;

const NoMessages = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 10px;
	color: ${props => props.theme.secondary};
	font-size: 26px;
	height: 100%;
	flex-grow: 2;
	flex-basis: 66.6666%;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export default Inbox;
