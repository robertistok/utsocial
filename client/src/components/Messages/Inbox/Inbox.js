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
	border-right: 0.5px solid grey;
	background-color: #c5cae9;
`;

const ThreadsContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100% - 50px)
`;

const Inbox = (props) => {
  const { conversations, user } = props;
  return (
    <Wrapper>
      <Header />
      <ThreadsContainer>
        <SearchBar type="text" placeholder="Search" />
        {conversations &&
          conversations.map((conv) => {
            const date = new Date(conv.messages[0].timestamp);
            const timestamp = `${date.getHours()}:${date.getMinutes()}`;
            return (
              <Thread
                key={date}
                subject={conv.subject}
                partner={conv.participants.find(p => p !== user.username)}
                timestamp={timestamp}
              />
            );
          })}
      </ThreadsContainer>
    </Wrapper>
  );
};

export default Inbox;
