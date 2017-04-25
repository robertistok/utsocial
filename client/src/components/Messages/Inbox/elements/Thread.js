/* eslint no-confusing-arrow: "off"*/
/* eslint-env es6*/
import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';
import { truncate } from '../../../../utils/style-utils';

const Thread = (props) => {
  const {
    subject,
    partner,
    timestamp,
    lastMessage,
    onClick,
    selectedConversation,
    id
  } = props;

  const { firstname, lastname } = partner;

  let className = '';
  let { unread } = lastMessage;

  if (selectedConversation) {
    className = selectedConversation._id === id ? 'active' : '';
  }
  if (unread && lastMessage.sender !== partner.username) {
    unread = false;
  }

  return (
    <MainWrapper onClick={onClick} className={className}>
      <Wrapper>
        <Partner unread={unread}>{`${firstname} ${lastname}`}</Partner>
        <Timestamp>{formatTime(timestamp)}</Timestamp>
      </Wrapper>
      <Subject unread={unread}>{subject}</Subject>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
	height: 70px;

	&:hover {
		background-color: #C5CAE9;
		cursor: pointer;
	}

	&.active {
		background-color: #9FA8DA;
	}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0px;
	padding: 0px 5px 0px 35px;
	margin-top: 15px !important;
	height: 20px;
`;

const Partner = styled.span`
	font-size: 16px;
	${truncate('100%')};
	font-weight: ${props => props.unread ? 'bold' : 'normal'};
	color: ${props => props.unread ? 'rgba(0, 0, 0, 1)' : 'rgba(75, 75, 75, 1)'};
`;

const Timestamp = styled.abbr`
	font-size: 13px;
	color: rgba(0, 0, 0, .40);
	font-weight: normal;
`;

const Subject = styled.h6`
	margin: 0px;
	padding: 0px 5px 0px 35px;
	margin-bottom: 15px;
	height: 20px;
	font-size: 13px;
	font-weight: ${props => props.unread ? 'bold' : 'normal'};
	color: ${props => props.unread ? 'rgba(0, 0, 0, 1)' : 'rgba(75, 75, 75, 1)'};
	${truncate('100%')}
`;

export default Thread;
