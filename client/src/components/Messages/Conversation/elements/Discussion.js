import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';

const Discussion = (props) => {
  const { selectedConversation, loggedInUser } = props;

  const partner = selectedConversation.participants.find(
    p => p.username !== loggedInUser.username
  );

  const renderMessage = (m) => {
    let sender;
    if (m.sender === partner.username) {
      sender = `${partner.firstname} ${partner.lastname}`;
    } else {
      sender = 'Me';
    }

    return (
      <MessageWrapper key={m._id} self={sender === 'Me'}>
        <Info>
          <Partner self={sender === 'Me'}>{sender}</Partner>
          <Timestamp>{formatTime(m.timestamp)}</Timestamp>
        </Info>
        <Message>{m.text}</Message>
      </MessageWrapper>
    );
  };

  if (!selectedConversation) return null;

  return (
    <Wrapper>
      {selectedConversation.messages.map(renderMessage)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
	height: calc(100% - 49px - 40px);

	border-bottom: 1px solid rgba(0, 0, 0, .10);
	overflow: auto;
`;

const Info = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const MessageWrapper = styled.span`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: e2edff;
	background-color: ${props => props.self ? '#f1f8e9' : '#dcedc8'}
	box-shadow: 0px 1px #e2edff;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
`;

const Partner = styled.span`
	padding-top: 10px;
	margin-left: 30px;
	font-size: 16px;
	color: rgba(0, 0, 0, 0.7);
`;

const Timestamp = styled.span`
	color: rgba(0, 0, 0, .40)
	font-size: 12px;
	margin-right: 25px;
`;

const Message = styled.p`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	word-wrap: normal;
	padding: 10px 20px;
`;

export default Discussion;
