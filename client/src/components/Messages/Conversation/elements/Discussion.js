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
    p => p._id !== loggedInUser._id
  );

  const renderMessage = (m) => {
    let sender;
    if (m.sender === partner._id) {
      sender = `${partner.firstname} ${partner.lastname}`;
    } else {
      sender = 'Me';
    }

    return (
      <MessageWrapper key={m._id + m.timestamp} self={sender === 'Me'}>
        <Info>
          <Partner self={sender === 'Me'}>{sender}</Partner>
          <Timestamp>{formatTime(m.timestamp, true)}</Timestamp>
        </Info>
        <Message self={sender === 'Me'}>{formatMultiLineText(m.text)}</Message>
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
    participants: arrayOf(shape({ _id: string.isRequired })),
    messages: arrayOf(
      shape({ _id: string.isRequired, unread: bool.isRequired })
    )
  }),
  loggedInUser: shape({ username: string.isRequired }).isRequired,
  fields: shape({ message: shape({ active: bool }) })
};

const Wrapper = styled.div`
	height: ${props => props.newMessageActive ? 'calc(100% - 49px - 130px)' : 'calc(100% - 49px - 40px)'};
	display: flex;
	flex-direction: column;
	flex: 1;
	border-bottom: 1px solid rgba(0, 0, 0, .10);
	overflow: auto;
	width: 100%;
`;

const Info = styled.div`
	display: flex;
	margin-bottom: 3px;
`;

const MessageWrapper = styled.div`
	display: flex;
	flex: none;
	flex-direction: column;
	justify-content: center;
	background-color: e2edff;
	align-self: ${props => props.self === true ? 'flex-end' : 'flex-start'}
	margin: 10px 25px;
	max-width: 80%;
`;

const Partner = styled.div`
	margin-left: 5px;
	margin-right: 15px;
	font-size: 13px;
	color: rgba(0, 0, 0, 0.7);
`;

const Timestamp = styled.div`
	color: rgba(0, 0, 0, .40)
	font-size: 11px;
	margin-right: 5px;
	margin-left: auto;
`;

const Message = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-radius: 6px;
	background-color: ${props => props.self === true ? '#f1f0f0' : props.theme.primary};
	color: ${props => props.self === true ? props.theme.black : props.theme.white};
	justify-content: center;
`;

export default Discussion;
