import React from 'react';
import styled from 'styled-components';

import Inbox from './Inbox';
import ConversationContainer from './ConversationContainer';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	height: 100%;
	overflow: auto;
	border: 0.5px solid grey;
`;

const Messages = props => (
  <Wrapper>
    <Inbox />
    <ConversationContainer />
  </Wrapper>
);

export default Messages;
