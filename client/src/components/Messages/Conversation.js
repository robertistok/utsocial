import React from 'react';
import styled from 'styled-components';

import ConversationHeader from './elements/ConversationHeader';
import Discussion from './elements/Discussion';
import NewMessageBox from './elements/NewMessageBox';

const Wrapper = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #e8eaf6;
`;

const Conversation = props => (
  <Wrapper>
    <ConversationHeader />
    <Discussion />
    <NewMessageBox {...props} />
  </Wrapper>
);

export default Conversation;
