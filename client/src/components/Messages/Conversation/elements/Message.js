import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';
import { formatMultiLineText } from '../../../../utils/style-utils';

const Message = (props) => {
  const { partner } = props;

  const sender = props.sender === partner._id
    ? `${partner.firstname} ${partner.lastname}`
    : 'Me';

  const selfMessage = sender === 'Me';

  return (
    <Wrapper self={selfMessage}>
      <Info>
        <Partner self={selfMessage}>{sender}</Partner>
        <Timestamp>{formatTime(props.timestamp, true)}</Timestamp>
      </Info>
      <Text self={selfMessage}>{formatMultiLineText(props.text)}</Text>
    </Wrapper>
  );
};

const { string, shape } = PropTypes;
Message.propTypes = {
  timestamp: string.isRequired,
  partner: shape({
    _id: string.isRequired,
    firstname: string.isRequired,
    lastname: string.isRequired
  }).isRequired,
  sender: string.isRequired,
  text: string.isRequired
};

const Info = styled.div`
	display: flex;
	margin-bottom: 3px;
`;

const Wrapper = styled.div`
	display: flex;
	flex: none;
	flex-direction: column;
	justify-content: center;
	background-color: e2edff;
	align-self: ${props => props.self === true ? 'flex-end' : 'flex-start'}
	margin: 10px 20px;
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

const Text = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 5px 10px;
	border-radius: 7px;
	background-color: ${props => props.self === true ? '#f1f0f0' : props.theme.primary};
	color: ${props => props.self === true ? props.theme.black : props.theme.white};
	justify-content: center;
`;

export default Message;
