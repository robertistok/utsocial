import React from 'react';
import styled from 'styled-components';

import SearchBar from './elements/SearchBar';
import Thread from './elements/Thread';
import Header from './elements/Header';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	flex: 1;
	border-right: 1px solid rgba(0, 0, 0, .10);
	background-color: #E8EAF6;
`;

const ThreadsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: auto;
	height: calc(100% - 50px)
`;

const Inbox = (props) => {
  const {
    conversations,
    user,
    selectConversation,
    selectedConversation
  } = props;

  return (
    <Wrapper>
      <Header />
      <ThreadsContainer>
        <SearchBar type="text" placeholder="Search" />
        {conversations && conversations.length !== 0
          ? conversations
              .sort(
                (c1, c2) => c1.messages[0].timestamp < c2.messages[0].timestamp
              )
              .map(conv => (
                <Thread
                  key={conv.messages[0].timestamp}
                  id={conv._id}
                  subject={conv.subject}
                  partner={conv.participants.find(
                    p => p.username !== user.username
                  )}
                  lastMessage={conv.messages[0]}
                  timestamp={conv.messages[0].timestamp}
                  onClick={() => selectConversation(conv._id)}
                  selectedConversation={selectedConversation}
                />
              ))
          : <div>
              <h1>No messages</h1>
            </div>}
      </ThreadsContainer>
    </Wrapper>
  );
};

export default Inbox;
