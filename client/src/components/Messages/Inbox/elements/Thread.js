/* eslint no-confusing-arrow: "off"*/
/* eslint-env es6*/
import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';
import { truncate } from '../../../../utils/style-utils';
import starFilled from '../../../../../public/star_filled.svg';
import starEmpty from '../../../../../public/star_empty.svg';

const Thread = (props) => {
  const {
    subject,
    partner,
    user,
    timestamp,
    lastMessage,
    onClick,
    selectedConversation,
    starred,
    onStarClick,
    id
  } = props;

  const { firstname, lastname } = partner;

  let className = '';
  const filled = starred.indexOf(user.username) > -1;
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
        <Logo filled={filled} onClick={onStarClick} />
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
		background-color: #9ccc65;
		cursor: pointer;
	}

	&.active {
		background-color: #689f38;
	}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 0px;
	padding: 0px 5px 0px 10px;
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
	margin-left: auto;
`;

const Subject = styled.h6`
	margin: 0px;
	padding: 0px 5px 0px 40px;
	margin-bottom: 15px;
	height: 20px;
	font-size: 13px;
	font-weight: ${props => props.unread ? 'bold' : 'normal'};
	color: ${props => props.unread ? 'rgba(0, 0, 0, 1)' : 'rgba(75, 75, 75, 1)'};
	${truncate('100%')}
`;

const Logo = styled.img`
	width: 18px;
	height: 18px;
	margin-right: 5px;

	content: url(${props => props.filled ? starFilled : starEmpty});

	&:hover {
		content: url(${starFilled});
		cursor: grab;
	}
`;

export default Thread;
