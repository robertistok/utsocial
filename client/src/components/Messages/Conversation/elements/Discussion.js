import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';

const Wrapper = styled.div`
	height: calc(100% - 49px - 40px);
	border-top: 1px solid rgba(0, 0, 0, .10);

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
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	flex-direction: column;
	justify-content: center;
`;

const Partner = styled.span`
	padding-top: 10px;
	margin-left: 30px;
	font-size: 16px;
	color: rgba(0, 0, 0, 0.7);
`;

const Timestamp = styled.span`
	color: rgba(0, 0, 0, 0.7);
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

const Discussion = (props) => {
  const { selectedConversation, loggedInUser } = props;

  const partner = selectedConversation.participants.find(
    p => p.username !== loggedInUser.username
  );

  if (!selectedConversation) return null;

  return (
    <Wrapper>
      {selectedConversation.messages.map(m => (
        <MessageWrapper key={m._id}>
          <Info>
            <Partner>{`${partner.firstname} ${partner.lastname}`}</Partner>
            <Timestamp>{formatTime(m.timestamp)}</Timestamp>
          </Info>
          <Message>{m.text}</Message>
        </MessageWrapper>
      ))}
    </Wrapper>
  );
};

export default Discussion;
