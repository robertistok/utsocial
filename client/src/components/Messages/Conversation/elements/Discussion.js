import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';
import { formatMultiLineText } from '../../../../utils/style-utils';

const Discussion = (props) => {
  const { selectedConversation, loggedInUser, fields } = props;

  const newMessageActive = fields !== undefined &&
    fields.message !== undefined &&
    fields.message.active === true;

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
          <Timestamp>{formatTime(m.timestamp, true)}</Timestamp>
        </Info>
        <Message>{formatMultiLineText(m.text)}</Message>
      </MessageWrapper>
    );
  };

  if (!selectedConversation) return null;

  return (
    <Wrapper newMessageActive={newMessageActive}>
      {selectedConversation.messages.map(renderMessage)}
    </Wrapper>
  );
};

const { arrayOf, shape, string, bool } = PropTypes;
Discussion.propTypes = {
  selectedConversation: shape({
    participants: arrayOf(shape({ username: string.isRequired })),
    messages: arrayOf(
      shape({ _id: string.isRequired, unread: bool.isRequired })
    )
  }),
  loggedInUser: shape({ username: string.isRequired }).isRequired,
  fields: shape({ message: shape({ active: bool }) })
};

const Wrapper = styled.div`
	height: ${props => props.newMessageActive ? 'calc(100% - 49px - 130px)' : 'calc(100% - 49px - 40px)'};

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
	background-color: ${props => props.self ? '#fafafa' : '#e0e0e0'}
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

const Message = styled.div`
	width: 100%;
	height: min-content;
	display: flex;
	padding: 10px 20px;
`;

export default Discussion;
