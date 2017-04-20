import React from 'react';
import styled from 'styled-components';

import infoLogo from '../../../../public/info.svg';

const Wrapper = styled.div`
	height: 50px;
	border-bottom: 0.5px solid grey;
	display: flex;
	justify-content: flex-end;
`;

const InfoLogo = styled.img`
	width: 30px;
	height: 30px;
	margin: 10px;
`;

const ConversationHeader = props => (
  <Wrapper>
    <InfoLogo src={infoLogo} alt="info" />
  </Wrapper>
);

export default ConversationHeader;
