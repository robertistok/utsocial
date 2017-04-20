import React from 'react';
import styled from 'styled-components';

import SearchBar from './elements/SearchBar';
import Thread from './elements/Thread';
import InboxHeader from './elements/InboxHeader';

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

const Inbox = props => (
  <Wrapper>
    <InboxHeader />
    <ThreadsContainer>
      <SearchBar type="text" placeholder="Search" />
      <Thread title="Exam" partner="Robert Istok" timestamp="14:46" />
    </ThreadsContainer>
  </Wrapper>
);

export default Inbox;
