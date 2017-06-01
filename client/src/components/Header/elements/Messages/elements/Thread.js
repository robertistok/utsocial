import React from 'react';
import styled from 'styled-components';

import { truncate } from '../../../../../utils/style-utils';
import { formatTime } from '../../../../../utils/timestamp';
import femaleLogo from '../../../../../assets/female.svg';
import maleLogo from '../../../../../assets/male.svg';

const Thread = (props) => {
  const { messages, subject, participants, current } = props;
  const lastMessage = messages[0];
  const { timestamp } = lastMessage;
  let { unread } = lastMessage;

  if (unread && lastMessage.sender === current) {
    unread = false;
  }

  const partner = participants.find(
    participant => participant.username !== current
  );
  const { firstname, lastname, gender } = partner;

  return (
    <Wrapper unread={unread}>
      <Logo gender={gender} />
      <SubjectAndPartnerWrapper>
        <Partner unread={unread}>
          {`${firstname} ${lastname}`}
        </Partner>
        <Subject>{subject}</Subject>
      </SubjectAndPartnerWrapper>
      <Timestamp>{formatTime(timestamp)}</Timestamp>
    </Wrapper>
  );
};

const Wrapper = styled.div`
	display: flex;
	padding: 12px 16px;
	background-color: ${props => props.unread === true && props.theme.newNotification}
	border-bottom: 1px solid ${props => props.theme.lightGray}
	margin-bottom: 5px;
	opacity: 0.75;

	transform: perspective(1px) translateZ(0);
	transition: all 0.25s;
	transition-property: transform;

	&:hover {
		opacity: 2;
		cursor: pointer;
	}
`;

const SubjectAndPartnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin: 0px 10px;
	color: ${props => props.theme.black};
`;

const Partner = styled.span`
	font-size: 14px;
	${truncate('170px')}
	font-weight: ${props => props.unread ? 'bold' : 'normal'};
	margin: auto 0px;
`;

const Timestamp = styled.abbr`
	font-size: 12px;
	color: ${props => props.theme.secondary};
	font-weight: normal;
	margin-left: auto;
	width: 50px;
	text-align: center;
`;

const Subject = styled.span`
	margin: 0px;
	height: 20px;
	font-size: 13px;
	${truncate('170px')}
`;

const Logo = styled.img`
	width: 30px;
	height: 30px;
	margin: 5px;

	content: url(${props => props.gender === 'male' ? maleLogo : femaleLogo});

	&.compose {
		margin: 0px;
	}
`;

export default Thread;
