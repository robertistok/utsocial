import React from 'react';
import styled from 'styled-components';

import infoLogo from '../../../../../public/info.svg';

const Wrapper = styled.div`
	height: 49px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Subject = styled.div`
	margin-left: auto;
	font-size: 2em;
`;

const LogoWrapper = styled.div`
	margin-right: 15px;
	margin-left: auto;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const InfoLogo = styled.img`
	width: 20px;
	height: 20px;
`;

const Header = (props) => {
  const { selectedConversation } = props;
  return (
    <Wrapper>
      <Subject>{selectedConversation.subject}</Subject>
      <LogoWrapper>
        <InfoLogo src={infoLogo} alt="info" />
      </LogoWrapper>

    </Wrapper>
  );
};

export default Header;
