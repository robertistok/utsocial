import React from 'react';
import styled from 'styled-components';

import { formatTime } from '../../../../utils/timestamp';

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

const Partner = styled.h4`
	font-size: 16px;
	color: #212121;
`;

const Timestamp = styled.p`
	font-size: 10px;
	color: #616161;
`;

const Subject = styled.h6`
	margin: 0px;
	padding: 0px 5px 0px 35px;
	margin-bottom: 15px;
	height: 20px;
	font-size: 14px;
	color: #424242;
`;

const Thread = (props) => {
  const {
    subject,
    partner,
    timestamp,
    onClick,
    selectedConversation,
    id
  } = props;

  let className = '';

  if (selectedConversation) {
    className = selectedConversation._id === id ? 'active' : '';
  }

  return (
    <MainWrapper onClick={onClick} className={className}>
      <Wrapper>
        <Partner>{partner}</Partner>
        <Timestamp>{formatTime(timestamp)}</Timestamp>
      </Wrapper>
      <Subject>{subject}</Subject>
    </MainWrapper>
  );
};

export default Thread;
