import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	height: 100%;
	overflow: auto;
`;

const Inbox = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: 100%;
	flex: 1;
	border: 1px solid black;
`;

const Message = styled.div`
	display: flex;
	min-height: min-content;
	height: 250px;
	border: 1px solid black;
`;

const Conversation = styled.div`
	flex: 2;
	border: 1px solid black;
`;

const Messages = props => (
  <Wrapper>
    <Inbox />
    <Conversation />
  </Wrapper>
);

export default Messages;
