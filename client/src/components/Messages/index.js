import React from 'react';
import styled from 'styled-components';

import Thread from './elements/Thread';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	height: 100%;
	overflow: auto;
`;

const Inbox = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	flex: 1;
	border: 1px solid black;
	background-color: #c5cae9;
`;

const MessagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100% - 50px)
`;

const Conversation = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	height: 100%;
	border: 1px solid black;
	background-color: #e8eaf6;
`;

const ConversationHeader = styled.div`
	height: 130px;
	border: 1px solid black;
`;

const Discussion = styled.div`
	height: calc(100% - 130px - 80px);
	border: 1px solid black;
`;

const NewMessage = styled.div`
	height: 80px;
	border: 1px solid black;
`;

const SearchBar = styled.input`
	height: 50px;
`;

const Messages = props => (
  <Wrapper>
    <Inbox>
      <SearchBar type="text" placeholder="Search" />
      <MessagesContainer>
        <Thread title="Exam" partner="Robert Istok" timestamp="2h ago" />
      </MessagesContainer>
    </Inbox>
    <Conversation>
      <ConversationHeader />
      <Discussion />
      <NewMessage />
    </Conversation>
  </Wrapper>
);

export default Messages;
