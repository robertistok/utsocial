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
	background-color: #FFFFFF;
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
    readMessages,
    selectedConversation,
    changeSearchterm,
    onStarClick
  } = props;

  const renderThreads = (conv) => {
    const partner = conv.participants.find(p => p.username !== user.username);

    const lastMessage = conv.messages[0];

    const onClick = () => {
      if (lastMessage.unread && lastMessage.sender === partner.username) {
        readMessages(conv._id);
      }
      if (selectedConversation._id !== conv._id) {
        selectConversation(conv._id);
      }
      changeSearchterm('');
    };

    return (
      <Thread
        key={lastMessage.timestamp}
        id={conv._id}
        user={user}
        starred={conv.starred}
        subject={conv.subject}
        partner={partner}
        lastMessage={lastMessage}
        timestamp={lastMessage.timestamp}
        onClick={onClick}
        onStarClick={() => onStarClick(conv._id)}
        selectedConversation={selectedConversation}
      />
    );
  };

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
              .map(renderThreads)
          : <div>
              <h1>No messages</h1>
            </div>}
      </ThreadsContainer>
    </Wrapper>
  );
};

export default Inbox;
