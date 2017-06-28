import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Message from './Message';

const Discussion = (props) => {
  const { selectedConversation, loggedInUser, fields } = props;

  const newMessageActive = fields !== undefined &&
    fields.message !== undefined &&
    fields.message.active === true;

  const partner = selectedConversation.participants.find(
    p => p._id !== loggedInUser._id
  );

  if (!selectedConversation) return null;

  return (
    <Wrapper newMessageActive={newMessageActive}>
      {selectedConversation.messages.map(message => (
        <Message
          key={message._id + message.timestamp}
          {...message}
          partner={partner}
        />
      ))}
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

export default Discussion;
